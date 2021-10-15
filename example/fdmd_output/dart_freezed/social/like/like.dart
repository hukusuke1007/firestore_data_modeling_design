import '../../thumbnail_image/thumbnail_image.dart';
import '../../converters/date_time_timestamp_converter.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'like.freezed.dart';
part 'like.g.dart';

@freezed
class Like with _$Like {
  factory Like({
    required String id,
    String? name,
    int? age,
    ThumbnailImage? image,
    @DateTimeTimestampConverter() DateTime? createdAt,
    @DateTimeTimestampConverter() DateTime? updatedAt,
  }) = _Like;
  Like._();

  factory Like.fromJson(Map<String, dynamic> json) =>
      _$LikeFromJson(json);

  static String get collectionPath => throw UnimplementedError(); // social/${socialId}/posters/${posterId}/posts/${postId}/likes
  static String docPath(String id) => throw UnimplementedError(); // social/${socialId}/posters/${posterId}/posts/${postId}/likes/$id

}
