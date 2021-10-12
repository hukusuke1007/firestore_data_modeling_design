import '../../converters/date_time_timestamp_converter.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'post.freezed.dart';
part 'post.g.dart';

@freezed
class Post with _$Post {
  factory Post({
    String? title,
    String? text,
    int? likeCount,
    double? stars,
    bool? isBookmark,
    @DateTimeTimestampConverter() DateTime? createdAt,
    @DateTimeTimestampConverter() DateTime? updatedAt,
  }) = _Post;
  Post._();

  factory Post.fromJson(Map<String, dynamic> json) =>
      _$PostFromJson(json);

  static String get collectionPath => throw UnimplementedError(); // social/${socialId}/posters/${posterId}/posts
  static String docPath(String id) => throw UnimplementedError(); // social/${socialId}/posters/${posterId}/posts/$id
  static String likesCollectionPath(String parentId) => throw UnimplementedError();
  static String likesDocPath(String parentId, String id) => throw UnimplementedError();

}
