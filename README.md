# Mars Rovers

View the [website](https://react-app-gdin.onrender.com)

Explore the Red Planet through the photos taken by NASA rovers, Curiosity, Opportunity, Spirit and Perseverance[^1].

## Usage

***Rovers tab: all rovers***

![Screenshot of all rovers at the Rovers tab, added in the Markdown.](/client/screenshots/mars-rovers.png)

***Rovers tab: click Perseverance***

![Screenshot of Perseverance rover's profile, added in the Markdown.](/client/screenshots/perseverance-show.png)

***Rovers tab: click any of Perseverance's cameras to view its photos***

![Screenshot of Perseverance's camera and its photos, added in the Markdown.](/client/screenshots/perseverance-camera-photos.png)

***Photos tab: all photos***

![Screenshot of all photos at the Photos tab, added in the Markdown.](/client/screenshots/mars-rovers-photos-all.png)

### Contributing

Pull requests with constructive feedback welcomed

#### Contributing: local installation

Fork & clone this repository

#### Rails Server: install dependencies, prepare the database, start the server

```bash
bundle install
rails db:setup
rails s
```

#### React Frontend: install dependencies, start the server

```bash
cd client
npm install
npm start
```

#### Resources

[^1]:This application derives data from the Mars Photo API maintained by chrisccerami.
Explore the [repository](https://github.com/chrisccerami/mars-photo-api).
