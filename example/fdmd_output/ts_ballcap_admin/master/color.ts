import { Doc, Field, Codable, Model, Timestamp, CollectionReference, Collection, firestore } from '@1amageek/ballcap-admin'

export class Color extends Doc {
  static collectionReference(): CollectionReference {
    return firestore.collection('master').doc('v1').collection('colors')
  }

  @Field codes?: string[]

}
