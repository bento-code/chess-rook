import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public test = this.socket.fromEvent<string>('initTest');
  public tests = this.socket.fromEvent<string[]>('tests');
  //documents = this.socket.fromEvent<string[]>('documents');

  constructor(private socket: Socket) { }

  public getTests(id: string) {
    this.socket.emit('getTests');
  }

  /*newDocument() {
    this.socket.emit('addDoc', { id: this.docId(), doc: '' });
  }

  editDocument(document: Document) {
    this.socket.emit('editDoc', document);
  }

  private docId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }*/
}