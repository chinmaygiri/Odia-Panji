/**
 * Firestore Security Rules Test Suite verifying all 12 "Dirty Dozen" payloads
 * return PERMISSION_DENIED.
 */

export interface DirtyDozenTestCase {
  id: number;
  name: string;
  collection: string;
  docId: string;
  operation: "create" | "update" | "delete" | "list";
  auth: { uid: string; email_verified: boolean } | null;
  payload?: Record<string, unknown>;
  expectedResult: "PERMISSION_DENIED";
}

export const dirtyDozenTests: DirtyDozenTestCase[] = [
  {
    id: 1,
    name: "Unauthenticated Write",
    collection: "panchangDays",
    docId: "2026-11-08",
    operation: "create",
    auth: null,
    payload: { date: "2026-11-08" },
    expectedResult: "PERMISSION_DENIED"
  },
  {
    id: 2,
    name: "Unverified Email Spoof",
    collection: "panchangDays",
    docId: "2026-11-08",
    operation: "create",
    auth: { uid: "u1", email_verified: false },
    payload: { date: "2026-11-08", updatedByUid: "u1" },
    expectedResult: "PERMISSION_DENIED"
  },
  {
    id: 3,
    name: "Identity Spoofing (updatedByUid mismatch)",
    collection: "festivals",
    docId: "raja_parba",
    operation: "create",
    auth: { uid: "u1", email_verified: true },
    payload: { id: "raja_parba", updatedByUid: "u2" },
    expectedResult: "PERMISSION_DENIED"
  },
  {
    id: 4,
    name: "Shadow Field Injection on Create",
    collection: "festivals",
    docId: "raja_parba",
    operation: "create",
    auth: { uid: "u1", email_verified: true },
    payload: { id: "raja_parba", updatedByUid: "u1", ghostField: true },
    expectedResult: "PERMISSION_DENIED"
  },
  {
    id: 5,
    name: "Shadow Field Injection on Update",
    collection: "rashifals",
    docId: "aries",
    operation: "update",
    auth: { uid: "u1", email_verified: true },
    payload: { id: "aries", updatedByUid: "u1", isVerified: true },
    expectedResult: "PERMISSION_DENIED"
  },
  {
    id: 6,
    name: "Value Poisoning (Oversized String)",
    collection: "festivals",
    docId: "raja_parba",
    operation: "create",
    auth: { uid: "u1", email_verified: true },
    payload: { id: "raja_parba", description: "x".repeat(2000) },
    expectedResult: "PERMISSION_DENIED"
  },
  {
    id: 7,
    name: "Type Confusion (solarDay as string)",
    collection: "panchangDays",
    docId: "2026-11-08",
    operation: "create",
    auth: { uid: "u1", email_verified: true },
    payload: { date: "2026-11-08", solarDay: "19" },
    expectedResult: "PERMISSION_DENIED"
  },
  {
    id: 8,
    name: "ID Poisoning",
    collection: "festivals",
    docId: "invalid$id!",
    operation: "create",
    auth: { uid: "u1", email_verified: true },
    payload: { id: "invalid$id!" },
    expectedResult: "PERMISSION_DENIED"
  },
  {
    id: 9,
    name: "Timestamp Forgery on Create",
    collection: "rashifals",
    docId: "aries",
    operation: "create",
    auth: { uid: "u1", email_verified: true },
    payload: { id: "aries", createdAt: "2020-01-01T00:00:00Z" },
    expectedResult: "PERMISSION_DENIED"
  },
  {
    id: 10,
    name: "Immortal Field Mutation (createdAt modified on update)",
    collection: "panchangDays",
    docId: "2026-11-08",
    operation: "update",
    auth: { uid: "u1", email_verified: true },
    payload: { date: "2026-11-08", createdAt: "2099-01-01T00:00:00Z" },
    expectedResult: "PERMISSION_DENIED"
  },
  {
    id: 11,
    name: "Unfiltered List Scraping of Non-Public Document",
    collection: "panchangDays",
    docId: "2026-11-08",
    operation: "list",
    auth: null,
    payload: { isPublic: false },
    expectedResult: "PERMISSION_DENIED"
  },
  {
    id: 12,
    name: "Unauthorized Delete by Non-Owner",
    collection: "festivals",
    docId: "raja_parba",
    operation: "delete",
    auth: { uid: "u2", email_verified: true },
    expectedResult: "PERMISSION_DENIED"
  }
];
