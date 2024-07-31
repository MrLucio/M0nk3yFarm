import { Flag } from './structs'

export type StatsResponse = {
    stats: number
}

export type FlagsResponse = {
    stats: StatsResponse
    flags: Flag[]
}
