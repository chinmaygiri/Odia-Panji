# Security Specification (`security_spec.md`)

## 1. Data Invariants
1. **Path ID Hardening**: Every single-document operation (`get`, `create`, `update`, `delete`) validates the path document ID (`dateId`, `festivalId`, `rashiId`, `monthId`) using `isValidId()` (`<= 128` chars, `^[a-zA-Z0-9_\-]+$`). `dateId` additionally matches `^[0-9]{4}-[0-9]{2}-[0-9]{2}$`.
2. **Identity & Verified User Integrity**: Write operations (`create`, `update`, `delete`) require a signed-in user with a verified email (`request.auth != null && request.auth.token.email_verified == true`), and `incoming().updatedByUid == request.auth.uid`.
3. **Strict Schema & Volumetric Bounds**: All fields on `PanchangDay`, `FestivalRecord`, `RashifalRecord`, and `MonthMappingRecord` must match exact allowed keys (`hasAll` and `hasOnly`), exact data types (`string`, `int`, `bool`, `timestamp`), and strict `.size() <= maxLength` constraints from `firebase-blueprint.json`.
4. **Temporal Integrity**: `createdAt == request.time` on `create`; `createdAt == existing().createdAt` (immutable) and `updatedAt == request.time` on `update`.
5. **Secure List Queries**: `allow list` rules explicitly enforce `resource.data.isPublic == true` so queries never delegate filtering without evaluating `resource.data`.

## 2. The "Dirty Dozen" Payloads
1. **Unauthenticated Write**: `auth = null` attempting `create` on `/panchangDays/2026-11-08` -> `PERMISSION_DENIED`.
2. **Unverified Email Spoof**: `auth = { uid: 'u1', token: { email: 'chinmoy20bap@gmail.com', email_verified: false } }` attempting `create` -> `PERMISSION_DENIED`.
3. **Identity Spoofing**: `auth = { uid: 'u1' }` setting `updatedByUid: 'u2'` on `create` -> `PERMISSION_DENIED`.
4. **Shadow Field Injection on Create**: Adding `isAdmin: true` to `/festivals/raja_parba` -> `PERMISSION_DENIED`.
5. **Shadow Field Injection on Update**: Modifying an unapproved key or adding `extraField: 'hack'` during `update` -> `PERMISSION_DENIED`.
6. **Value Poisoning (Oversized String)**: Setting `description` to a 5,000-character string (`> 1000` maxLength) -> `PERMISSION_DENIED`.
7. **Type Confusion**: Setting `solarDay` to `"19"` (string instead of int) -> `PERMISSION_DENIED`.
8. **ID Poisoning**: Creating `/festivals/bad$id!@#` with invalid characters -> `PERMISSION_DENIED`.
9. **Timestamp Forgery on Create**: Passing a past/future client timestamp for `createdAt` instead of `request.time` -> `PERMISSION_DENIED`.
10. **Immortal Field Mutation**: Mutating `createdAt` or `date` during `update` on `/panchangDays/2026-11-08` -> `PERMISSION_DENIED`.
11. **Unfiltered List Scraping of Non-Public Doc**: Querying a document where `isPublic == false` -> `PERMISSION_DENIED`.
12. **Unauthorized Delete by Non-Owner**: User `u2` attempting to delete a record created by `u1` -> `PERMISSION_DENIED`.
