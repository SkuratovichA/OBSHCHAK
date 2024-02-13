import type { ObshchakUser, Transaction } from '../types'
import { CurrencyType, TransactionStatusType } from '../types'

export const transactionsMock: Transaction[] = [
  {
    id: 'txn1',
    description: 'Payment for services rendered',
    name: 'Transaction 1',
    currency: CurrencyType.USD,
    from: 'mister_bulochka',
    to: [{ username: 'username', amount: 200 }],
    status: TransactionStatusType.Paid,
    transactionDate: new Date('2023-01-01'),
    createdDate: new Date('2023-01-01'),
    resolvedDate: new Date('2023-01-02'),
    categories: ['Services'],
    groups: ['Group 1'],
  },
  {
    id: 'txn2',
    description: 'Monthly subscription fee',
    name: 'Transaction 2',
    currency: CurrencyType.EUR,
    from: 'username',
    to: [{ username: 'mister_bulochka', amount: 150 }],
    status: TransactionStatusType.Active,
    transactionDate: new Date('2023-02-01'),
    createdDate: new Date('2023-02-01'),
    resolvedDate: null,
    categories: ['Subscription'],
    groups: ['Group 2'],
  },
  {
    id: 'txn3',
    description: 'Gift',
    name: 'Transaction 3',
    currency: CurrencyType.CZK,
    from: 'username',
    to: [{ username: 'mister_bulochka', amount: 1000 }],
    status: TransactionStatusType.Pending,
    transactionDate: new Date('2023-03-01'),
    createdDate: new Date('2023-03-01'),
    resolvedDate: null,
    categories: ['Gift'],
    groups: ['Group 1'],
  },
  {
    id: 'txn4',
    description: 'Lunch reimbursement',
    name: 'Transaction 4',
    currency: CurrencyType.USD,
    from: 'mister_bulochka',
    to: [{ username: 'Pushchair_Andrei', amount: 50 }],
    status: TransactionStatusType.Paid,
    transactionDate: new Date('2023-01-15'),
    createdDate: new Date('2023-01-14'),
    resolvedDate: new Date('2023-01-15'),
    categories: ['Reimbursement', 'Food'],
    groups: ['Lunch Group'],
  },
  {
    id: 'txn5',
    description: 'Gift for Tatiana',
    name: 'Transaction 5',
    currency: CurrencyType.EUR,
    from: 'mister_bulochka',
    to: [{ username: 'fxffffffff', amount: 100 }],
    status: TransactionStatusType.Pending,
    transactionDate: new Date('2023-02-14'),
    createdDate: new Date('2023-02-13'),
    resolvedDate: null,
    categories: ['Gift'],
    groups: ['Friends'],
  },
  {
    id: 'txn6',
    description: 'Shared hosting fees',
    name: 'Transaction 6',
    currency: CurrencyType.CZK,
    from: 'mister_bulochka',
    to: [
      { username: 'vladislav', amount: 300 },
      { username: 'tsiar_iv333n', amount: 300 },
      { username: 'gxggggg', amount: 300 },
    ],
    status: TransactionStatusType.Active,
    transactionDate: new Date('2023-03-01'),
    createdDate: new Date('2023-02-28'),
    resolvedDate: null,
    categories: ['Hosting', 'Shared Expenses'],
    groups: ['Tech Group'],
  },
  {
    id: 'txn7',
    description: 'Charity Donation',
    name: 'Transaction 7',
    currency: CurrencyType.USD,
    from: 'mister_bulochka',
    to: [{ username: 'CharityFoundation', amount: 200 }],
    status: TransactionStatusType.Paid,
    transactionDate: new Date('2023-04-01'),
    createdDate: new Date('2023-03-31'),
    resolvedDate: new Date('2023-04-02'),
    categories: ['Donation'],
    groups: ['Charity Donations'],
  },
]


// TODO: move it to the actual Backend API level
export const usersMock: ObshchakUser[] = [
  {
    id: '1',
    name: 'Andrei Shchapaniak',
    username: 'Pushchair_Andrei',
    email: 'andrei_bandit_228@gmail.com',
    profileImage: 'https://randomuser.me/portraits/med/men/1.jpg',
    mobileNumber: '+420735594008'
  },
  {
    id: '2',
    name: 'Tatiana Fedorova',
    username: 'fxffffffff',
    email: 'arstoienarstione@gmail.com',
    profileImage: 'https://randomuser.me/portraits/med/women/2.jpg',
    mobileNumber: '+420735594008'
  },
  {
    id: '3',
    name: 'Vladislav Sokolovskii',
    username: 'vladislav',
    email: 'vladislav@gmail.com',
    profileImage: 'https://randomuser.me/portraits/med/men/3.jpg',
    mobileNumber: '+420735594008'
  },
  {
    id: '4',
    name: 'Vladislav Zhopa',
    username: 'vladislav_zhopa',
    email: 'vladislav_zhopa@gmail.com',
    profileImage: 'https://randomuser.me/portraits/med/men/4.jpg',
    mobileNumber: '+420735594008'
  },
  {
    id: '5',
    name: 'Ivan Tsiareshkin',
    username: 'tsiar_iv333n',
    email: 'tsiar_iv33n@gmail.com',
    profileImage: 'https://randomuser.me/portraits/med/men/5.jpg',
    mobileNumber: '+420735594008'
  },
  {
    id: '6',
    name: 'Tatiana Oaenar',
    username: 'gxggggg',
    email: 'tatatatat@gmail.com',
    profileImage: 'https://randomuser.me/portraits/med/women/6.jpg',
    mobileNumber: '+420735594008'
  },
  {
    id: '7',
    name: 'Stanislav Sokolovskii',
    username: 'stanislav_zhopa',
    email: 'stanislav@gmail.com',
    profileImage: 'https://randomuser.me/portraits/med/men/7.jpg',
    mobileNumber: '+420735594008'
  },
  {
    id: '8',
    name: 'Vladislav Oiryw',
    username: 'vladislav_uqlqqle',
    email: 'vladislav_popa@gmail.com',
    profileImage: 'https://randomuser.me/portraits/med/men/8.jpg',
    mobileNumber: '+420735594008'
  },
  {
    id: '9',
    name: 'Ivan Zhopa',
    username: 'tsiar_zhopa',
    email: 'zhopa_zhopa@gmail.com',
    profileImage: 'https://randomuser.me/portraits/med/men/9.jpg',
    mobileNumber: '+420735594008'
  },
  {
    id: '10',
    name: 'Mister Bulochka',
    username: 'mister_bulochka',
    email: 'mister.bulochka@gmail.com',
    profileImage: 'https://randomuser.me/portraits/med/men/10.jpg',
    mobileNumber: '+420735594008'
  },
]
