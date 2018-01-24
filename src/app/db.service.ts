import { Injectable } from '@angular/core';
import { PouchDB } from 'pouchdb';
import { pouchDBDecorators } from 'pouchdb';

@Injectable()
export class DBService {
  public db: any;

  constructor() {
    this.db = new PouchDB('9pp', {
      auto_compaction: true
    });

    this.db.sync(null, {
      live: true,
      retry: true
    });

    this.db.find = pouchDBDecorators.qify(this.db.find);

    this.db.createIndex({
      index: {
          fields: ['type'],
          name: 'type_index'
      }
    });
  }
}
