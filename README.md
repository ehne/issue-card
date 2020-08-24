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
![dark mode](https://issue-card.vercel.app/api/midataur/mathsender?one=Makeitwork&two=Makeitgood&three=Makeitfast&theme=light)

## Warning:
the api can only handle 5k requests an hour. that is the limit set by the github api.

## Deploy your own:
to make your own cool version of this card, just press the button bellow and deploy it to vercel. You will also need to create a github personal access token and save it in your vercel environment variables under `PAT`. This token should have access to only the public repo scope, that is all it needs.