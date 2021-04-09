# github readme issue card

## Usage:
```
![card](https://issue-card.vercel.app/api/[username]/[repo]?one=[first label]&two=[second label]&three=[thrid label]&theme=[theme option])
```

theme can be `light` or `dark`.


## Preview:

### Light mode: `theme=light`
![light mode](https://issue-card.vercel.app/api/midataur/mathsender?one=Makeitwork&two=Makeitgood&three=Makeitfast&theme=light)



### Dark mode: `theme=dark`
![dark mode](https://issue-card.vercel.app/api/midataur/mathsender?one=Makeitwork&two=Makeitgood&three=Makeitfast&theme=dark)

## Warning:
the api can only handle 5k requests an hour. that is the limit set by the github api.

## Deploy your own:
to make your own cool version of this card, just press the button bellow and deploy it to vercel. You will also need to create a github personal access token and save it in your vercel environment variables under `PAT`. This token should have access to only the public repo scope, that is all it needs.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git?s=https%3A%2F%2Fgithub.com%2Fehne%2Fissue-card&env=PAT&envDescription=your%20GitHub%20personal%20access%20token.)


# extra!
because this is basically a REST rapper around the GraphQl API, there are some other things you can request as well.

## api/status/username
will give you the user's github status info. (message and emoji)

note: the emoji is done with the github :name: syntax