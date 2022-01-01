import TrackPlayer from 'react-native-track-player';

module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', async () => await TrackPlayer.play());

  TrackPlayer.addEventListener('remote-pause', async () => await TrackPlayer.pause());

  TrackPlayer.addEventListener('remote-stop', async () => await TrackPlayer.stop());

  TrackPlayer.addEventListener('remote-jump-backward', async () => { TrackPlayer.seekTo(await TrackPlayer.getPosition() - 15); });

  TrackPlayer.addEventListener('remote-jump-forward', async () => { TrackPlayer.seekTo(await TrackPlayer.getPosition() + 15); });

  TrackPlayer.addEventListener('remote-next', async () => {
     // playerStore.setCurrentTrack(playerStore.currentPlayList[index - 1])
     const q = await TrackPlayer.getQueue()
     const c = await TrackPlayer.getCurrentTrack()
     console.log(q.length, c);
     if (c < q.length - 1)
     await TrackPlayer.skipToNext()
  } );

  TrackPlayer.addEventListener('remote-previous', async () => {
    // playerStore.setCurrentTrack(playerStore.currentPlayList[index - 1])
    const q = await TrackPlayer.getQueue()
    const c = await TrackPlayer.getCurrentTrack()
    console.log(q.length, c);
    if (c !== 0) {
      await TrackPlayer.skipToPrevious()
    }
  });
}
