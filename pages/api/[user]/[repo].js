// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Color from "color"
import { request, gql, GraphQLClient } from 'graphql-request'




async function getData(repo, user) {
    const endpoint = 'https://api.github.com/graphql';
   
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${process.env.PAT}`,
      },
    })
   
    const query = gql`
        query getIssues{
            repository(name: "${repo}", owner: "${user}") {
              hasIssuesEnabled
              labels(first: 10) {
                totalCount
                nodes {
                  color
                  id
                  name
                  openIssuesCount: issues(states: OPEN) {
                    count: totalCount
                  }
                  closedIssuesCount: issues(states: CLOSED) {
                    count: totalCount
                  }
                }
              }
            }
          }
        `
   
    const data = await graphQLClient.request(query)
   // console.log(JSON.stringify(data, undefined, 2))
    return data
  }


const generateColumn = (props, themeColours) => {
    const { title, color, noCompleted, total, index } = props
    console.log(themeColours)
    const bgColor = Color(color)
    // figure out what colour to use for the text
    const textColor = bgColor.isDark() ? "#fff" : "#000";
    return ` <g id="issue-colum-${index}" transform="translate(${
        26 + 17 * index + 138 * index
    }, 68)">
            <rect id="not-done-box" fill="${color}" opacity="0.3" x="0" y="17" width="138" height="174" rx="3"></rect>
            <rect id="issue-percentage-done-box" fill="${color}" x="0" y="9" width="138" height="${11 + (171 * (noCompleted/total))}" ${(noCompleted/total)>=1?"rx='3'":''}></rect>
            <rect id="issue-bg" fill="${color}" x="0" y="0" width="138" height="17" rx="3"></rect>
            
            <text text-anchor="middle" y="14" x="${
            138 / 2
            }" font-family="Arial, Helvetica, sans-serif"  font-size="11" font-weight="bold" fill="${textColor}">
                ${title}
            </text>
            <text text-anchor="middle" y="213" x="${
                138 / 2
                }" font-family="Arial, Helvetica, sans-serif"  font-size="16" font-weight="bold" fill="${themeColours.text}">
                ${noCompleted}/${total}
            </text>
        </g>`;
};

const generateColumns = (
    columnsArray = [
        { title: "Make it work", color: "#000", noCompleted: 0, total: 9 },
        { title: "Make it good", color: "#05f", noCompleted: 2, total: 4 },
        { title: "Make it fast", color: "#fa0", noCompleted: 2, total: 2 },
    ], themeColours
    ) => {
    return columnsArray.map((element, index) =>
        generateColumn({ ...element, index }, themeColours)
    );
};

async function main(req, res) {
    //console.log(req)
    const {
        query: { repo, user, one, two, three, theme },
      } = req
    //console.log(user, repo)
    const data = await getData(repo,user)
      //console.log(data.repository.labels.nodes)
    //const data = getData(repo, user)

    

    const labelsArray = await data.repository.labels.nodes.map((node,index)=>{
        //console.log(node)
        return {title:node.name, titleSpaceless:node.name.replace(/ /g,""), color:`#${node.color}`, noCompleted:node.closedIssuesCount.count, total: (node.closedIssuesCount.count + node.openIssuesCount.count)}
    }) 
    //console.log([one,two,three].includes("Makeitgood"))
    let newLabelsArray = []
    newLabelsArray[0] = labelsArray.filter(label=>[one].includes(label.titleSpaceless))
    newLabelsArray[1] = labelsArray.filter(label=>[two].includes(label.titleSpaceless))
    newLabelsArray[2] = labelsArray.filter(label=>[three].includes(label.titleSpaceless))
    //console.log(newLabelsArray)
    //console.log(data)
    
    const uhhh = [
        newLabelsArray[0][0],
        newLabelsArray[1][0],
        newLabelsArray[2][0],
    ]
    console.log(uhhh)

    const isDarkMode = (theme=="dark")
    const themeColours = {
        text: !isDarkMode?'#020202':'#fff',
        bg: isDarkMode?'#161622':'#F9F9F8'
    }
    res.statusCode = 200;
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
    <svg width="527px" height="335px" viewBox="0 0 527 335" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>card</title>
        <defs>
            <rect id="path-1" x="0" y="0" width="499" height="307" rx="11"></rect>
            <filter x="-4.2%" y="-7.5%" width="108.4%" height="113.7%" filterUnits="objectBoundingBox" id="filter-2">
                <feMorphology radius="0.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                <feOffset dx="0" dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1"></feComposite>
                <feColorMatrix values="0 0 0 0 0.614809783   0 0 0 0 0.61270106   0 0 0 0 0.61270106  0 0 0 0.2 0" type="matrix" in="shadowBlurOuter1" result="shadowMatrixOuter1"></feColorMatrix>
                <feMorphology radius="0.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter2"></feMorphology>
                <feOffset dx="0" dy="-2" in="shadowSpreadOuter2" result="shadowOffsetOuter2"></feOffset>
                <feGaussianBlur stdDeviation="6.5" in="shadowOffsetOuter2" result="shadowBlurOuter2"></feGaussianBlur>
                <feComposite in="shadowBlurOuter2" in2="SourceAlpha" operator="out" result="shadowBlurOuter2"></feComposite>
                <feColorMatrix values="0 0 0 0 0.725713315   0 0 0 0 0.725713315   0 0 0 0 0.725713315  0 0 0 0.2 0" type="matrix" in="shadowBlurOuter2" result="shadowMatrixOuter2"></feColorMatrix>
                <feMerge>
                    <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                    <feMergeNode in="shadowMatrixOuter2"></feMergeNode>
                </feMerge>
            </filter>
        </defs>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="theme/clean" transform="translate(-94.000000, -41.000000)">
                <g id="card" transform="translate(108.000000, 57.000000)">
                    <g id="Background">
                        <g id="bg-plane">
                            <use fill="black" fill-opacity="1" filter="url(#filter-2)" xlink:href="#path-1"></use>
                            <use stroke="#E7E7E7" stroke-width="1" fill="${themeColours.bg}" fill-rule="evenodd" xlink:href="#path-1"></use>
                        </g>
                        <text id="Issue-Progress" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="bold" letter-spacing="0.0885716667" fill="${themeColours.text}">
                            <tspan x="18" y="37">Issue Progress</tspan>
                        </text>
                    </g>
                    ${generateColumns(uhhh, themeColours)}
                    
                </g>
            </g>
        </g>
    </svg>`);
};

export default main