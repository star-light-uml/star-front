import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {MessageService} from "./message.service";

@Injectable()
export class HttpService {
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8'})
    };
    constructor(public httpClient: HttpClient, public messageService: MessageService) {}


    httpPost(reqUrl: string, reqBody, comp) {
        this.httpClient.post(reqUrl, reqBody, this.httpOptions)
            .subscribe(
                val => {
                    comp(val);
                },
                error => {
                    this.messageService.showMessage("网络请求失败！", "error");
                }
            );

    }

    httpGet(reqUrl, comp) {
        this.httpClient.get(reqUrl, this.httpOptions)
            .subscribe(
                val => {
                    comp(val);
                },
                error => {
                    this.messageService.showMessage("网络请求失败！", "error");
                }
            );
    }
}
