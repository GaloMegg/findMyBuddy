import BuddyService from "../../../services/buddy.service"

export const BUDDIES_TYPE_OPTIONS = [{ title: 'Dog', icon: 'dog' }, { title: 'Cat', icon: 'cat' }]
export const BUDDIES_STATUS_OPTIONS = [{ title: 'Safe', icon: 'home' }, { title: 'Lost', icon: 'alert' }]

export const createBuddy = async (buddyData) => {
    let loading = true
    let result = undefined
    console.log(buddyData)
    try {
        if (!buddyData.name || !buddyData.type || !buddyData.status) { throw new Error('Missing buddy data') }

        const budyService = BuddyService.getInstance()
        result = await budyService.create(buddyData.ownerId, buddyData)
        loading = false

    } catch (error) {
        console.error(error)
        loading = false
        throw error
    }
    finally {
        console.log({ loading, result })
        return { loading, result }
    }
}