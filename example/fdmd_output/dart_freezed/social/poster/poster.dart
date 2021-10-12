import '../../converters/date_time_timestamp_converter.dart';
import '../../thumbnail_image/thumbnail_image.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'poster.freezed.dart';
part 'poster.g.dart';

@freezed
class Poster with _$Poster {
  factory Poster({
    required String id,
    String? name,
    int? age,
    ThumbnailImage? image,
    @DateTimeTimestampConverter() DateTime? createdAt,
    @DateTimeTimestampConverter() DateTime? updatedAt,
  }) = _Poster;
  Poster._();

  factory Poster.fromJson(Map<String, dynamic> json) =>
      _$PosterFromJson(json);

  static String get collectionPath => throw UnimplementedError(); // social/${socialId}/posters
  static String docPath(String id) => throw UnimplementedError(); // social/${socialId}/posters/$id
}
