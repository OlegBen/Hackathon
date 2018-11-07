export interface _Vacancy {
    id?: string
    company: string
    type: string
    logo?: string
    url?: string
    position: string
    location_id: string
    sub_category_id: string
    description: string
    is_public: Boolean
    email: string
    phone?: string

    creator_id: string
    created: Date
    token?: string
}

export interface _Resume {
    id?: string
    name: string
    age: number
    type: string
    position: string
    location_id: string
    sub_category_id: string
    description: string
    is_public: Boolean
    email: string

    creator_id: string
}