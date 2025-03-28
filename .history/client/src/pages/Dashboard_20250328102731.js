useEffect(() => {
    const q = query(collection(db, "sensors"), orderBy("timestamp", "desc"), limit(1));
    onSnapshot(q, (snapshot) => {
      setSensorData(snapshot.docs[0].data());
    });
  }, []);