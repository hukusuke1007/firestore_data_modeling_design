import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'thumbnail_image.freezed.dart';
part 'thumbnail_image.g.dart';

@freezed
class ThumbnailImage with _$ThumbnailImage {
  factory ThumbnailImage({
    required String url,
    required String path,
  }) = _ThumbnailImage;
  ThumbnailImage._();

  factory ThumbnailImage.fromJson(Map<String, dynamic> json) =>
      _$ThumbnailImageFromJson(json);
}
