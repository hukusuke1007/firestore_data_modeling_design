import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'color.freezed.dart';
part 'color.g.dart';

@freezed
class Color with _$Color {
  factory Color({
    List<String>? codes,
  }) = _Color;
  Color._();

  factory Color.fromJson(Map<String, dynamic> json) =>
      _$ColorFromJson(json);

  static String get collectionPath => throw UnimplementedError(); // master/${masterId}/colors
  static String docPath(String id) => throw UnimplementedError(); // master/${masterId}/colors/$id

}
