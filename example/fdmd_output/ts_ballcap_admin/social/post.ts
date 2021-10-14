import { Like } from './like'
import { Doc, Field, Codable, Model, Timestamp, CollectionReference, Collection, firestore } from '@1amageek/ballcap-admin'

export class Post extends Doc {
  static collectionReference(): CollectionReference {
    return firestore.collection('social').doc('v1').collection('posts')
  }

  @Field title?: string
  @Field text?: string
  @Field likeCount?: number
  @Field stars?: number
  @Field isBookmark?: boolean

  @SubCollection likes: Collection<Like> = new Collection()
}
