const toggleActuator = async () => {
    await axios.post(`/api/actuators/${actuatorId}/control`, { 
      action: state === "on" ? "off" : "on" 
    });
  };