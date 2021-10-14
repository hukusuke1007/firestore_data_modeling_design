import { Field, Model, Codable, Timestamp } from '@1amageek/ballcap-admin'

export class ThumbnailImage extends Model {
  @Field url: string
  @Field path: string
}
