import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Prestamo } from '../models/prestamo.model';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}
  //Crea un nuevo prestamo
  public create(data: Prestamo) {
    return this.firestore.collection('prestamo').add(data);
  }
  //Obtiene un prestamo
  public getbyID(documentId: string) {
    return this.firestore
      .collection('prestamo')
      .doc(documentId)
      .snapshotChanges();
  }
  //Obtiene todos los prestamos
  public getAll() {
    return this.firestore.collection('prestamo').snapshotChanges();
  }
  //Actualiza un prestamo
  public update(documentId: string, data: Prestamo) {
    return this.firestore.collection('prestamo').doc(documentId).set(data);
  }
}
