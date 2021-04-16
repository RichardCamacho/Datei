
export class Category {
    id = 0;
    name: string | null = null;
    icon: string | null = null;
    count = 0;
    color?: string | null = null;
}

export const mailbox: Category[] = [
    {
        id: 1,
        name: 'Inbox',
        icon: 'fas fa-inbox',
        count: 5
    },
    {
        id: 2,
        name: 'Sent',
        icon: 'fas fa-paper-plane',
        count: 0
    },
    {
        id: 3,
        name: 'Draft',
        icon: 'fas fa-box',
        count: 5
    },
    {
        id: 4,
        name: 'Spam',
        icon: 'fas fa-history',
        count: 0
    },
    {
        id: 5,
        name: 'Trash',
        icon: 'fas fa-trash',
        count: 5
    }
];

export const filter: Category[] = [
    {
        id: 501,
        name: 'Star',
        icon: 'fas fa-star',
        count: 0
    },
    {
        id: 502,
        name: 'Important',
        icon: 'fas fa-bookmark',
        count: 0
    }
];

export const label: Category[] = [
    {
        id: 701,
        name: 'Personal',
        icon: 'fas fa-tags',
        count: 0,
        color: '#f62d51'
    },
    {
        id: 702,
        name: 'Work',
        icon: 'fas fa-tags',
        count: 0,
        color: '#2962ff'
    },
    {
        id: 703,
        name: 'Payment',
        icon: 'fas fa-tags',
        count: 0,
        color: '#7460ee'
    },
    {
        id: 704,
        name: 'Invoice',
        icon: 'fas fa-tags',
        count: 0,
        color: '#ffbc34'
    },
    {
        id: 705,
        name: 'Account',
        icon: 'fas fa-tags',
        count: 0,
        color: '#4fc3f7'
    }
];
