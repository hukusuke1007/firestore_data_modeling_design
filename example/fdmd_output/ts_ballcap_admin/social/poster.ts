import { ThumbnailImage } from '../thumbnail_image'
import { Post } from './post'
import { Doc, Field, Codable, Model, Timestamp, CollectionReference, Collection, firestore } from '@1amageek/ballcap-admin'

export class Poster extends Doc {
  static collectionReference(): CollectionReference {
    return firestore.collection('social').doc('v1').collection('posters')
  }

  @Field id: string
  @Field name?: string
  @Field age?: number
  @Codable(ThumbnailImage) @Field image?: ThumbnailImage

  @SubCollection posts: Collection<Post> = new Collection()
}
