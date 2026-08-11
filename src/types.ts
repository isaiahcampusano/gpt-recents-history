export type Quota = {
  id: string
  label: string
  used?: number
  limit?: number
  resetsInHours?: number
  resetsInDays?: number
  unlimited?: boolean
}

export type HealthState = 'green' | 'yellow' | 'red'

export type ActiveConversation = {
  id: string
  title: string
  estimatedTokens: number
  messageCount: number
  healthState: HealthState
}

export type MemoryFlag = 'stale' | 'possible duplicate' | null

export type SavedMemory = {
  id: string
  text: string
  createdAt: string
  flag: MemoryFlag
}

export type MemoryFixture = {
  savedMemories: SavedMemory[]
  referenceChatHistoryEnabled: boolean
}
