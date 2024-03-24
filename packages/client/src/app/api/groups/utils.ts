import type { Group, IdMap, ObshchakUser, Paginatable, SerializedGroup } from 'app-common'
import { entries } from 'app-common'
import { isSerializedGroup } from 'app-common'
import { isPaginatable } from 'app-common'

export type GroupsResponse = IdMap<SerializedGroup>

export type GroupsMap = IdMap<Group>


export const deserializeGroup = (group: SerializedGroup): Group => ({
  ...group,
  creationDate: new Date(group.creationDate),
})

export const serializeGroup = (group: Group): SerializedGroup => ({
  ...group,
  creationDate: group.creationDate.toISOString(),
})

export const deserializeGroupsResponse = (groupsResponse: GroupsResponse): GroupsMap =>
  entries(groupsResponse)
    .reduce<GroupsMap>((acc, [id, group]) => ({
      ...acc,
      [id]: deserializeGroup(group),
    }), {})


export type GroupsRequestBody = Paginatable<{
  usernames: Array<ObshchakUser['username']> | null
  groupId: Group['id'] | null
}>

export const isGroupsResponse = (obj: object): obj is GroupsResponse =>
  Object.entries(obj).every(([id, group]) => id === group.id && isSerializedGroup(group))


export type GroupsAddRequestBody = {
  groups: SerializedGroup[]
}
export const isGroupsAddRequestBody = (obj: object): obj is GroupsAddRequestBody =>
  'groups' in obj && Array.isArray(obj.groups) && obj.groups.every(isSerializedGroup)

export type GroupsDeleteRequestBody = {
  groupIds: Array<Group['id']>
}
export const isGroupsDeleteRequestBody = (obj: object): obj is GroupsDeleteRequestBody =>
  'groupIds' in obj && Array.isArray(obj.groupIds) && obj.groupIds.every(id => typeof id === 'string')


export const isGroupsRequestBody = (obj: object): obj is GroupsRequestBody =>
  isPaginatable(obj) &&
  typeof obj === 'object' &&
  (
    'usernames' in obj && (Array.isArray(obj.usernames) || obj.usernames === null)
    ||
    'groupId' in obj && typeof obj.groupId === 'string'
  )
