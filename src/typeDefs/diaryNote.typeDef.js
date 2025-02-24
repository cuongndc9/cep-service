import { POLICY, DIARY_FILTER } from '../components/constants';

const typeDef = `
  extend type Query {
    diaryNotes(filter: Filter!, offset: Int, limit: Int): DiaryNotesOutput
  }
  extend type Mutation {
    createDiaryNote(title: String!, notes: String, policy: Policy!): DiaryNote
    updateDiaryNote(id: String!, title: String, notes: String, policy: Policy): DiaryNote
  }

  enum Policy {
    ${POLICY.public}
    ${POLICY.private}
  }
  enum Filter {
    ${DIARY_FILTER.all}
    ${DIARY_FILTER.byAccount}
    ${DIARY_FILTER.byRelative}
  }
  type DiaryNote {
    id: String
    title: String
    notes: String
    activityId: String
    imageId: String
    refId: String
    status: String
    policy: Policy
    createdBy: String
    updatedBy: String
    createdAt: DateTime
    updatedAt: DateTime
  }
  type DiaryNotesOutput {
    byAccount: AllAndCount
    byRelative: AllAndCount
  }
  type AllAndCount {
    count: Int
    rows: [DiaryNote]
  }
`;

export default typeDef;
