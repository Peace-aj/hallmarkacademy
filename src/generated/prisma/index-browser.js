
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.AdministrationScalarFieldEnum = {
  id: 'id',
  username: 'username',
  email: 'email',
  role: 'role',
  createdAt: 'createdAt',
  updateAt: 'updateAt'
};

exports.Prisma.SchoolScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  phone: 'phone',
  address: 'address',
  logo: 'logo',
  createdAt: 'createdAt',
  updateAt: 'updateAt'
};

exports.Prisma.StudentScalarFieldEnum = {
  id: 'id',
  username: 'username',
  admissionnumber: 'admissionnumber',
  firstname: 'firstname',
  surname: 'surname',
  othername: 'othername',
  birthday: 'birthday',
  gender: 'gender',
  religion: 'religion',
  studenttype: 'studenttype',
  house: 'house',
  bloodgroup: 'bloodgroup',
  admissiondate: 'admissiondate',
  email: 'email',
  phone: 'phone',
  address: 'address',
  state: 'state',
  lga: 'lga',
  avarta: 'avarta',
  parentid: 'parentid',
  schoolid: 'schoolid',
  classid: 'classid',
  createdAt: 'createdAt',
  updateAt: 'updateAt'
};

exports.Prisma.TeacherScalarFieldEnum = {
  id: 'id',
  username: 'username',
  title: 'title',
  firstname: 'firstname',
  surname: 'surname',
  othername: 'othername',
  birthday: 'birthday',
  bloodgroup: 'bloodgroup',
  gender: 'gender',
  state: 'state',
  lga: 'lga',
  email: 'email',
  phone: 'phone',
  address: 'address',
  avarta: 'avarta',
  schoolid: 'schoolid',
  createdAt: 'createdAt',
  updateAt: 'updateAt'
};

exports.Prisma.ParentScalarFieldEnum = {
  id: 'id',
  username: 'username',
  title: 'title',
  firstname: 'firstname',
  surname: 'surname',
  othername: 'othername',
  birthday: 'birthday',
  bloodgroup: 'bloodgroup',
  gender: 'gender',
  occupation: 'occupation',
  religion: 'religion',
  state: 'state',
  lga: 'lga',
  email: 'email',
  phone: 'phone',
  address: 'address',
  createdAt: 'createdAt',
  updateAt: 'updateAt'
};

exports.Prisma.SubjectScalarFieldEnum = {
  id: 'id',
  name: 'name',
  category: 'category',
  schoolid: 'schoolid',
  createdAt: 'createdAt',
  updateAt: 'updateAt'
};

exports.Prisma.ClassScalarFieldEnum = {
  id: 'id',
  name: 'name',
  category: 'category',
  level: 'level',
  capacity: 'capacity',
  formmasterid: 'formmasterid',
  createdAt: 'createdAt',
  updateAt: 'updateAt'
};

exports.Prisma.PaymentSetupScalarFieldEnum = {
  id: 'id',
  amount: 'amount',
  fees: 'fees',
  partpayment: 'partpayment',
  session: 'session',
  term: 'term',
  schoolid: 'schoolid',
  createdAt: 'createdAt',
  updateAt: 'updateAt'
};

exports.Prisma.TermScalarFieldEnum = {
  id: 'id',
  start: 'start',
  end: 'end',
  nextterm: 'nextterm',
  daysopen: 'daysopen',
  session: 'session',
  term: 'term',
  status: 'status',
  createdAt: 'createdAt',
  updateAt: 'updateAt'
};

exports.Prisma.PaymentScalarFieldEnum = {
  id: 'id',
  session: 'session',
  term: 'term',
  amount: 'amount',
  schoolid: 'schoolid',
  studentid: 'studentid',
  createdAt: 'createdAt',
  updateAt: 'updateAt'
};

exports.Prisma.AssignmentScalarFieldEnum = {
  id: 'id',
  title: 'title',
  text: 'text',
  file: 'file',
  duedate: 'duedate',
  graded: 'graded',
  subjectid: 'subjectid',
  teacherid: 'teacherid',
  createdAt: 'createdAt',
  updateAt: 'updateAt'
};

exports.Prisma.TestScalarFieldEnum = {
  id: 'id',
  title: 'title',
  status: 'status',
  instructions: 'instructions',
  duration: 'duration',
  maxscore: 'maxscore',
  open: 'open',
  testdate: 'testdate',
  testtime: 'testtime',
  term: 'term',
  subjectid: 'subjectid',
  teacherid: 'teacherid',
  createdAt: 'createdAt',
  updateAt: 'updateAt'
};

exports.Prisma.QuestionScalarFieldEnum = {
  id: 'id',
  text: 'text',
  options: 'options',
  answer: 'answer',
  testid: 'testid'
};

exports.Prisma.AnswerScalarFieldEnum = {
  id: 'id',
  score: 'score',
  testid: 'testid',
  studentid: 'studentid',
  createdAt: 'createdAt',
  updateAt: 'updateAt'
};

exports.Prisma.SubmissionScalarFieldEnum = {
  id: 'id',
  answer: 'answer',
  feedback: 'feedback',
  score: 'score',
  file: 'file',
  assignmentId: 'assignmentId',
  studentId: 'studentId',
  createdAt: 'createdAt',
  updateAt: 'updateAt'
};

exports.Prisma.GradeScalarFieldEnum = {
  id: 'id',
  title: 'title',
  session: 'session',
  term: 'term',
  createdAt: 'createdAt',
  updateAt: 'updateAt'
};

exports.Prisma.ClassGradeScalarFieldEnum = {
  id: 'id',
  classid: 'classid',
  gradeid: 'gradeid'
};

exports.Prisma.SubjectGradeScalarFieldEnum = {
  id: 'id',
  subjectid: 'subjectid',
  classid: 'classid'
};

exports.Prisma.StudentGradeScalarFieldEnum = {
  id: 'id',
  firstCa: 'firstCa',
  secondCa: 'secondCa',
  thirdCa: 'thirdCa',
  fourthCa: 'fourthCa',
  exams: 'exams',
  score: 'score',
  grade: 'grade',
  remark: 'remark',
  studentid: 'studentid',
  subjectgradeid: 'subjectgradeid'
};

exports.Prisma.EffectiveDomainScalarFieldEnum = {
  id: 'id',
  classattendance: 'classattendance',
  punctuality: 'punctuality',
  initiative: 'initiative',
  responsibility: 'responsibility',
  neatness: 'neatness',
  cooperation: 'cooperation',
  organization: 'organization',
  studentid: 'studentid',
  gradeid: 'gradeid'
};

exports.Prisma.PsychomotiveDomainScalarFieldEnum = {
  id: 'id',
  hardworking: 'hardworking',
  sports: 'sports',
  studentid: 'studentid',
  gradeid: 'gradeid'
};

exports.Prisma.AttendanceScalarFieldEnum = {
  id: 'id',
  date: 'date',
  present: 'present',
  studentId: 'studentId'
};

exports.Prisma.EventScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  startTime: 'startTime',
  endTime: 'endTime',
  classId: 'classId'
};

exports.Prisma.AnnouncementScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  date: 'date',
  classId: 'classId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.Roles = exports.$Enums.Roles = {
  Admin: 'Admin',
  Super: 'Super',
  Management: 'Management'
};

exports.UserSex = exports.$Enums.UserSex = {
  MALE: 'MALE',
  FEMALE: 'FEMALE'
};

exports.Terms = exports.$Enums.Terms = {
  First: 'First',
  Second: 'Second',
  Third: 'Third'
};

exports.TermStatus = exports.$Enums.TermStatus = {
  Active: 'Active',
  Inactive: 'Inactive'
};

exports.TestStatus = exports.$Enums.TestStatus = {
  Completed: 'Completed',
  Cancelled: 'Cancelled',
  Pending: 'Pending'
};

exports.Prisma.ModelName = {
  Administration: 'Administration',
  School: 'School',
  Student: 'Student',
  Teacher: 'Teacher',
  Parent: 'Parent',
  Subject: 'Subject',
  Class: 'Class',
  PaymentSetup: 'PaymentSetup',
  Term: 'Term',
  Payment: 'Payment',
  Assignment: 'Assignment',
  Test: 'Test',
  Question: 'Question',
  Answer: 'Answer',
  Submission: 'Submission',
  Grade: 'Grade',
  ClassGrade: 'ClassGrade',
  SubjectGrade: 'SubjectGrade',
  StudentGrade: 'StudentGrade',
  EffectiveDomain: 'EffectiveDomain',
  PsychomotiveDomain: 'PsychomotiveDomain',
  Attendance: 'Attendance',
  Event: 'Event',
  Announcement: 'Announcement'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
