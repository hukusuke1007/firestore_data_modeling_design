import '../../converters/date_time_timestamp_converter.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'maintenance.freezed.dart';
part 'maintenance.g.dart';

@freezed
class Maintenance with _$Maintenance {
  factory Maintenance({
    required String status,
    @DateTimeTimestampConverter() DateTime? createdAt,
    @DateTimeTimestampConverter() DateTime? updatedAt,
  }) = _Maintenance;
  Maintenance._();

  factory Maintenance.fromJson(Map<String, dynamic> json) =>
      _$MaintenanceFromJson(json);

  static String get collectionPath => throw UnimplementedError(); // appService/${appServiceId}/maintenance
  static String docPath(String id) => throw UnimplementedError(); // appService/${appServiceId}/maintenance/$id

}
