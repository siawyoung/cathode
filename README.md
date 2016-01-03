# Cathode

Cathode is a Hugo theme that is heavily inspired by iTunes's album view UI and is specialized for displaying a grid of visual elements, such as album covers.

Cathode was released separately during the process of creating a site to document my favourite music of 2015.

[Check it out here!](http://top2015.siawyoung.com)

## Usage

To install, simply clone this repository into your `themes` folder, then `cd` into the Cathode folder and run `npm install`. I also recommend you to [install `Cairo`](https://github.com/Automattic/node-canvas), as colour precomputation will require it (read below).

Place the following in your `config.toml`:

```
preserveTaxonomyNames = true
[taxonomies]
type = "types"
```

You might also want to add the following params to add content to the jumbotron:

```
[params]
jumbotronTitle = "Best of 2015"
jumbotronSubtitle1 = "A list of all my favourite music to come out this year 🎉"
jumbotronAuthor = "@siawyoung"
jumbotronAuthorLink = "http://siawyoung.com"
```

The best way to learn how to use the theme is to check out my [site repo](https://github.com/siawyoung/top2015), but I'll write some instructions below too.

## Writing a Post

Let's take a look at how a typical post looks like:

```
+++
artist = "Caligula's Horse"
cover = "bloom"
date = "2015-12-31T12:50:21+08:00"
title = "Bloom"
types = "album"
+++

{{% side_info %}}
{{< spotify "spotify:album:57oryV2mZbhyoy7u3k0lqg" >}}
{{% /side_info %}}

Rock/Metal (Progressive)

Australia's been on a roll in 2015 with the likes of Courtney Barnett, Holy Holy, Tame Impala all putting out superb tracks. Caligula's Horse is a recent discovery, a band from Brisbane, and while they're definitely not scoring points for breaking boundaries, what they do manage to do is put out some great progressive rock that isn't a wankery show (which is more than you can ask for these days). It's not heavy - Rust is about as heavy as it gets - but the singing is actually decent, and good riffs are aplenty.

#### Favourite tracks

Bloom, Marigold, Firelight, Rust, Turntail
```

To create a post, the following front matter syntax is used:

```
artist = "Caligula's Horse"
cover = "bloom"
date = "2015-12-31T12:50:21+08:00"
title = "Bloom"
types = "album"
```

The artist, date, and title fields are self-explanatory.

### Cover

The `cover` field is the filename of corresponding jpg (Cathode only looks for jpg files, but this can be easily modified to support multiple filetypes if you include the filetype extension - just change the line in Cathode's `index.html` from `<img class="album-thumbnail" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=" data-src="images/{{ .Params.cover }}.jpg" onload="lzld(this)">` to `<img class="album-thumbnail" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=" data-src="images/{{ .Params.cover }}" onload="lzld(this)">`). Cathode will look for in your `/static/images` folder, so your images should be located there.

### Type

The `types` field dictates which category the post falls under. If you look at my site, you'll notice three categories: Albums, Live Shows, and Singles. These categories are automatically generated based on the types value in each post.

### Shortcodes

Cathode ships with three different types of shortcodes: `side_info`, `spotify`, `youtube`. The `side_info` shortcode is used to include any arbitrary content on the right side of the expanded area. The `spotify` and `youtube` shortcodes are convenience shortcodes to include Youtube and Spotify iframe embeds with lazy-loading support. The example post above uses `side_info` and `spotify` in conjunction to include a Spotify embed in the `side_info` area.

#### Spotify

```
{{< spotify "spotify_uri" >}}
```

#### Youtube

```
{{< youtube "youtube_video_id" >}}
```

### Archetypes

Cathode contains 3 archetypes, `albums`, `live`, and `singles` to help you generate empty posts with the required front matter. For example, to create a new post with type `album`:

```
$ hugo new albums/i-am-a-new-post.md
```

[You can easily create your own archetypes as well](http://gohugo.io/content/archetypes/).

## Colour Generation

To generate the colours, Cathode makes use of [Colibri](https://github.com/arcanis/colibri.js/). Colibri can invoked by the browser, or it can be run with Node and the values precomputed and stored in a Hugo data file (located in `/data/colours.json`). The latter (precomputing) is recommended, as using Colibri on the browser incurs a noticeable performance hit.

To precompute the values, `cd` into the Cathode folder and run `npm run processColours`. This will require you to have `Cairo` installed on your system, which is not part of the `npm install` process.

This script will loop through all your posts and look at the `cover` field, and then look in the `static` folder for a file with the corresponding filename, and then run Colibri with that filename.

If for some reason you cannot precompute the colours, you can also use Colibri on the browser. To do that, add:

```
[params]
browserProcessing = true
```

to your `config.toml`.

## Misc.

### Meta Description

The site's meta description can be added like so:

```
[params]
description = "The best music of 2015, according to Siaw Young."
```

### Favicon

Your favicon should be placed in `/static/favicon` and named `logo.ico`.

## Contributing

The styles for Cathode is written in PostCSS. I've included a `postcss-cli` config file (`postcss.json`) that includes all of the plugins required to process the PostCSS source.