import ProfileTabs from "./ProfileTabs";

export default function Profile() {
  return (
    <div className="box-border w-full min-w-0 max-w-full px-3 py-4 sm:px-4 sm:py-5 md:p-6 lg:p-8">
      <header className="mb-4 min-w-0 sm:mb-6 md:mb-8">
        <h1 className="break-words text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl">
          Profile
        </h1>
      </header>

      <div className="w-full min-w-0 max-w-full lg:max-w-4xl">
        <ProfileTabs />
      </div>
    </div>
  );
}
