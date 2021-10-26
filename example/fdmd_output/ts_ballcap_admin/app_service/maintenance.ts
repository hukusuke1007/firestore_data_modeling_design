import { Doc, Field, Codable, Model, Timestamp, CollectionReference, Collection, firestore } from '@1amageek/ballcap-admin'

export class Maintenance extends Doc {
  static collectionReference(): CollectionReference {
    return firestore.collection('appService').doc('v1').collection('maintenance')
  }

  @Field status: string

}
