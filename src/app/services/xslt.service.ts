import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class XsltService {
  
  xslStylesheet: any;
  xsltProcessor = new XSLTProcessor();
  xmlDoc: any;
  xmlDom: DOMParser = new DOMParser();

  constructor() { }
  transform(xmlPath: string, xslPath: string): any {
    this.xslStylesheet = this.getFile(xslPath);
    this.xsltProcessor.importStylesheet(this.xslStylesheet);
    this.xmlDoc = this.getFile(xmlPath);

    return this.xsltProcessor.transformToFragment(this.xmlDoc, document);
  }

  transformJSON(xmlPath: string, xslPath: string): any {
    var fragment = this.transform(xmlPath, xslPath);
    var text = fragment.firstChild?.nodeValue;
    var obj = JSON.parse(text!);

    return obj;
  }

  getFile(path: string): any {
    var myXMLHTTPRequest = new XMLHttpRequest();
    myXMLHTTPRequest.open("GET", path, false);
    myXMLHTTPRequest.send(null);

    return myXMLHTTPRequest.responseXML;
  }
}
