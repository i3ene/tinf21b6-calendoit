import { DatePipe } from '@angular/common';
import { Injectable, Pipe } from '@angular/core';
import { AppComponent } from '../app.component';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class XsltService {
  xslStylesheet: any;
  xsltProcessor = new XSLTProcessor();
  xmlDoc: any;
  xmlDom: DOMParser = new DOMParser();

  constructor() {}

  /**
   * Transform XML and XSL to XSLT
   * @param xmlPath Path to XML
   * @param xslPath Path to XSL
   * @returns generated DocumentFragment
   */
  async asyncTransform(xslPath: string, xmlPath?: string, timeStamps?: boolean): Promise<any> {
    this.xslStylesheet = await this.asyncGetFile(xslPath);
    this.xsltProcessor.importStylesheet(this.xslStylesheet);
    this.xmlDoc = xmlPath ? await this.asyncGetFile(xmlPath) : this.saveXML(AppComponent.data.getSaveData(), timeStamps);

    return this.xsltProcessor.transformToFragment(this.xmlDoc, document);
  }

  /**
   * Transform XML and XSL to JSON
   * @param xmlPath Path to XML
   * @param xslPath Path to XSL
   * @returns generated JSON
   */
  async asyncTransformJSON(xslPath: string, xmlPath?: string, timeStamps?: boolean): Promise<any> {
    var fragment = await this.asyncTransform(xslPath, xmlPath, timeStamps);
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
    return await fetch(path)
      .then((response) => response.text())
      .then((data) => this.xmlDom.parseFromString(data, 'text/xml'));
  }

  /**
   * @deprecated Use {@link asyncTransform}
   */
  transform(xslPath: string, xmlPath?: string, timeStamps?: boolean): any {
    this.xslStylesheet = this.getFile(xslPath);
    this.xsltProcessor.importStylesheet(this.xslStylesheet);
    this.xmlDoc = xmlPath ? this.getFile(xmlPath) : this.saveXML(AppComponent.data.getSaveData(), timeStamps);

    return this.xsltProcessor.transformToFragment(this.xmlDoc, document);
  }

  /**
   * @deprecated Use {@link asyncTransformJSON}
   */
  transformJSON(xslPath: string, xmlPath?: string, timeStamps?: boolean): any {
    var fragment = this.transform(xslPath, xmlPath, timeStamps);
    var text = fragment.firstChild?.nodeValue;
    var obj = JSON.parse(text!);

    return obj;
  }

  /**
   * @deprecated Use {@link asyncGetFile}
   */
  getFile(path: string): any {
    var myXMLHTTPRequest = new XMLHttpRequest();
    myXMLHTTPRequest.open('GET', path, false);
    myXMLHTTPRequest.send(null);

    return myXMLHTTPRequest.responseXML;
  }

  /**
   * Convert an Object to XML
   * @param obj Any Object
   * @param timeStamps If timestamps should be added
   * @returns generated XMLDocument
   */
  saveXML(obj: any, timeStamps?: boolean) {
    // Root Tag
    var xmlDoc = document.implementation.createDocument(null, 'root');
    var root = this.createObjectNode(obj, 'root', xmlDoc.documentElement);
    xmlDoc.documentElement.setAttribute("type", "object");

    // Timestamps
    if (timeStamps) {
      var datetime = document.createElementNS(null, 'datetime');
      var day = document.createElementNS(null, 'day');

      const date = new Date();
      datetime.append(new DatePipe('de-DE').transform(date, 'yyyy-MM-dd')!);
      day.append(date.getDay().toString());

      root.appendChild(datetime);
      root.appendChild(day)
    }

    // Tag Instruction
    const beginDoc = xmlDoc.createProcessingInstruction(
      'xml',
      'version="1.0" encoding="UTF-8"'
    );
    xmlDoc.insertBefore(beginDoc, xmlDoc.firstChild);

    return xmlDoc;
  }

  /**
   * Create a Node for the Object and its properties
   * @param obj Any Object, Array or Primitive
   * @param name The name of the Node
   * @returns generated Node
   */
  createObjectNode(obj: any, name: string, element?: HTMLElement) {
    var node = null;
    if (element) node = element;
    else node = document.createElementNS(null, name);

    // Primitive
    if (obj !== Object(obj)) {
      if (typeof obj == 'number') node.setAttribute('type', 'number');
      node.append(String(obj));
      return node;
    }
    // Date
    if (Object.prototype.toString.call(obj) == '[object Date]') {
      node.setAttribute('type', 'date');
      node.append((obj as Date).toJSON());
    }
    // Array
    else if (Array.isArray(obj)) {
      node.setAttribute('type', 'array');
    }
    // Object
    else {
      node.setAttribute('type', 'object');
    }

    // Iterate through properties
    for (const [key, value] of Object.entries(obj)) {
      var label: string = Array.isArray(obj) ? 'value' + key : key.toString();
      node.appendChild(this.createObjectNode(value, label));
    }

    return node;
  }
}
