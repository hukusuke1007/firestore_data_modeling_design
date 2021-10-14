import { ThumbnailImage } from '../thumbnail_image'
import { Doc, Field, Codable, Model, Timestamp, CollectionReference, Collection, firestore } from '@1amageek/ballcap-admin'

export class Like extends Doc {
  static collectionReference(): CollectionReference {
    return firestore.collection('social').doc('v1').collection('likes')
  }

  @Field id: string
  @Field name?: string
  @Field age?: number
  @Codable(ThumbnailImage) @Field image?: ThumbnailImage

}
