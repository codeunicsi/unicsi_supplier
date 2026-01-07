import ProfileTabs from "./ProfileTabs"

export default function Profile() {
    return (
        <div className="w-full p-4 md:p-6 lg:p-8">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 md:mb-8">Profile</h1>

            <div className="max-w-full lg:max-w-4xl">
                <ProfileTabs />
            </div>
        </div>
    )
}
