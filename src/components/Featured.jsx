import React, { useState, useEffect } from "react";

import { useAuth } from "../context/AuthContext";
import { db, storage } from "../firebase";

import { Form, Col, Button } from "react-bootstrap";

function Featured() {
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [podcast, setPodcast] = useState("");
  const [duration, setDuration] = useState(0);
  const [thumbnail, setThumbnail] = useState("");
  const [doc, setDoc] = useState("");

  useEffect(() => {
    setLoading(true);
    const unsubscribe = db
      .collection("featured")
      .onSnapshot((querySnapshot) => {
        setName(querySnapshot.docs[0].data()["name"]);
        setDes(querySnapshot.docs[0].data()["description"]);
        setDuration(querySnapshot.docs[0].data()["duration"]);
        setPodcast(querySnapshot.docs[0].data()["podcast"]);
        setThumbnail(querySnapshot.docs[0].data()["thumbnail"]);
        setDoc(querySnapshot.docs[0].id);
        setLoading(false);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  var getDuration = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      var audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      audioContext.decodeAudioData(event.target.result, function (buffer) {
        var duration = buffer.duration;
        console.log("The duration of the song is of: " + duration + " seconds");
        setDuration(Math.floor(duration));
        setPodcast(file);
      });
    };
    reader.onerror = function (event) {
      console.error("An error ocurred reading the file: ", event);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setStatus("(Uploading)");
      console.log(podcast, thumbnail);
      var pod =
        typeof podcast != "string"
          ? await uploadFile(podcast, "podcasts")
          : podcast;
      var thumb =
        typeof thumbnail != "string"
          ? await uploadFile(thumbnail, `thumbnails/${currentUser.uid}/`)
          : thumbnail;
      setStatus("(Updating)");
      db.collection("featured")
        .doc(doc)
        .set(
          {
            name: name,
            description: des,
            podcast: pod,
            thumbnail: thumb,
            duration: duration,
            uid: currentUser.uid,
          },
          { merge: true }
        )
        .then((value) => {
          setLoading(false);
          setStatus("(Done)");
        });
    } catch (error) {
      setError(error.message);
      setLoading(false);
      setStatus("Error");
    }
  };

  const uploadFile = async (file, collection) => {
    console.log(file.name);
    const ref = storage.ref().child(`${collection}/${Date.now() + file.name}`);
    await ref.put(file);
    var url = await ref.getDownloadURL();
    return url;
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)} style={{ marginTop: "30px" }}>
      <Form.Row>{error != "" && `${error}`}</Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Podcast Name</Form.Label>
          <Form.Control
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
          />
        </Form.Group>
      </Form.Row>

      <Form.Group controlId="formGridAddress1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          as="textarea"
          placeholder="Description"
          value={des || ""}
          onChange={(e) => setDes(e.target.value)}
        />
      </Form.Group>

      <Form.Row>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Podcast</Form.Label>
          <Form.Control type="file" onChange={(e) => getDuration(e)} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Thumbnail</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
          />
        </Form.Group>
      </Form.Row>

      <Button variant="primary" type="submit" disabled={loading} block>
        Submit {status != "" && `${status}`}
      </Button>
    </Form>
  );
}

export default Featured;
