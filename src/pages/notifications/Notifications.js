import { useEffect, useState } from "react";
import Main from "../../components/layout/Main";
import { getAll } from "../../API/NotificationsApi";

const Notifications = () => {
  const [notifications, setNotfications] = useState([]);
  const [sortByDate, setSortByDate] = useState("");
  // Add force state to force rerender notifications
  // eslint-disable-next-line
  const [forceUpdate, setForceUpdate] = useState(true);

  useEffect(() => {
    getNotifications();
  }, []);

  useEffect(() => {
    console.log(sortByDate);
    if (sortByDate === "newest") {
      setForceUpdate((f) => !f);
      setNotfications((n) =>
        n.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      );
    } else if (sortByDate === "oldest") {
      setForceUpdate((f) => !f);
      setNotfications((n) =>
        n.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).reverse()
      );
    }
  }, [sortByDate, notifications]);

  const getNotifications = async () => {
    const allNotifications = await getAll();
    allNotifications.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setNotfications(allNotifications);
  };

  const handleSelectedSort = (e) => {
    setSortByDate(e);
  };

  return (
    <Main>
      <div className="md:ml-8 lg:mr-20 mr-10 mt-8">
        <div className="flex justify-between">
          <h2 className="text-cyan-800 font-semibold">Your Notifications</h2>
          <div>
            <label className="font-semibold">Sort By</label>
            <select
              className="border bg-cyan-light rounded-full p-2 mx-1 focus-visible:outline-none"
              value={sortByDate}
              onChange={(event) => handleSelectedSort(event.target.value)}
            >
              <option disabled value="">
                {" "}
                Select
              </option>
              <option value="newest">Newest Notification</option>
              <option value="oldest">Oldest Notification</option>
            </select>
          </div>
        </div>

        <ul>
          {notifications.length > 0 &&
            notifications.map((notification, index) => (
              <li
                key={index}
                className="border border-cyan-md-light rounded-lg my-5 lg:w-3/4 p-4 "
              >
                <div className="text-md-xs font-semibold mb-3">
                  {notification.content}
                </div>
                <div className="text-md-xs font-normal text-gray-500">
                  {notification.date}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </Main>
  );
};

export default Notifications;
