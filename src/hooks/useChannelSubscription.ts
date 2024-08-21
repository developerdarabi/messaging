import { useEffect, useState } from 'react';

const useChannelSubscription = ({ pusher, channelName, events }: any) => {
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    if (pusher && channelName && events) {
      const pusherChannel = pusher.subscribe(channelName);
      Object.keys(events).map((key: string) => {
        const handler = events[key]
        pusherChannel.bind(key, handler);
      })
      setChannel(pusherChannel);

      return () => {
        pusherChannel.unbind_all();
        pusherChannel.unsubscribe();
      };
    }
  }, [pusher]);

  return channel;
};

export default useChannelSubscription;
