import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class XsltService {

  xslStylesheet: any;
  xsltProcessor = new XSLTProcessor();
  xmlDoc: any;
  xmlDom: DOMParser = new DOMParser();

  constructor() { }

  /**
   * Transform XML and XSL to XSLT
   * @param xmlPath Path to XML
   * @param xslPath Path to XSL
   * @returns generated DocumentFragment
   */
  async asyncTransform(xmlPath: string, xslPath: string): Promise<any> {
    this.xslStylesheet = await this.asyncGetFile(xslPath);
    this.xsltProcessor.importStylesheet(this.xslStylesheet);
    this.xmlDoc = await this.asyncGetFile(xmlPath);

    return this.xsltProcessor.transformToFragment(this.xmlDoc, document);
  }

  /**
   * Transform XML and XSL to JSON
   * @param xmlPath Path to XML
   * @param xslPath Path to XSL
   * @returns generated JSON
   */
  async asyncTransformJSON(xmlPath: string, xslPath: string): Promise<any> {
    var fragment = await this.asyncTransform(xmlPath, xslPath);
    var text = fragment.firstChild?.nodeValue;
    var obj = JSON.parse(text!);

    return obj;
  }

  /**
   * Fetch a remote File
   * @param path Path to File
   * @returns fetched File
   */
  async asyncGetFile(path: string): Promise<any> {
    return await fetch(path).then(response => response.text()).then(data => this.xmlDom.parseFromString(data, 'text/xml'));
  }

  /**
   * @deprecated Use {@link asyncTransform}
   */
  transform(xmlPath: string, xslPath: string): any {
    this.xslStylesheet = this.getFile(xslPath);
    this.xsltProcessor.importStylesheet(this.xslStylesheet);
    this.xmlDoc = this.getFile(xmlPath);

    return this.xsltProcessor.transformToFragment(this.xmlDoc, document);
  }

  /**
   * @deprecated Use {@link asyncTransformJSON}
   */
  transformJSON(xmlPath: string, xslPath: string): any {
    var fragment = this.transform(xmlPath, xslPath);
    var text = fragment.firstChild?.nodeValue;
    var obj = JSON.parse(text!);

    return obj;
  }

  /**
   * @deprecated Use {@link asyncGetFile}
   */
  getFile(path: string): any {
    var myXMLHTTPRequest = new XMLHttpRequest();
    myXMLHTTPRequest.open("GET", path, false);
    myXMLHTTPRequest.send(null);

    return myXMLHTTPRequest.responseXML;
  }

  /**
   * Convert an Object to XML
   * @param obj Any Object
   * @returns generated XMLDocument
   */
  saveXML(obj: any) {
    var xmlDoc = document.implementation.createDocument(null, "root");

    var nodes = this.createObjectNode(obj, "list").childNodes;
    nodes.forEach(node => xmlDoc.documentElement.appendChild(node));

    return xmlDoc;
  }

  /**
   * Create a Node for the Object and its properties
   * @param obj Any Object, Array or Primitive
   * @param name The name of the Node
   * @returns generated Node
   */
  createObjectNode(obj: any, name: string) {
    var node = document.createElement(name);

    // Primitive
    if (obj !== Object(obj)) {
      if (typeof obj == 'number') node.setAttribute("type", "number");
      node.append(String(obj));
      return node;
    }
    // Date
    if (Object.prototype.toString.call(obj) == '[object Date]') {
      node.setAttribute("type", "date");
      node.append((obj as Date).toJSON());
    }
    // Array
    else if (Array.isArray(obj)) {
      node.setAttribute("type", "array");
    }
    // Object
    else {
      node.setAttribute("type", "object");
    }

    // Iterate through properties
    for (const [key, value] of Object.entries(obj)) {
      var label: string = Array.isArray(obj) ? "value" + key : key.toString();
      node.appendChild(this.createObjectNode(value, label));
    }

    return node;
  }

}
