// pages/personInfo/personInfo.js
var app = getApp();
const network = require("../../utils/network.js")
const {
    api,
    config
} = require('../../utils/config.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        status: '', // V义工、U用户
        headImg: '',
        name: '',
        ServiceCount: 0,
        remind: 0,
        volunteerNav: [{
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA/CAMAAACVf2tdAAAAkFBMVEUAAAD4ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti2LWoPqAAAAL3RSTlMA49jnLCcw7d8LOqobI9vSNQ8T9XwXoUwFSY9zs6+dYfE/unmIg89SWJhsysJEaQ5grGoAAAKsSURBVEjHvZXpkqIwFEbDEgibEjCYjiBLs4qa93+7idII2O0Qp6b6/JJUjrfulxsAP0Ivx7522gBIEzB+J/FkDavj4ZmVRcZjV1Jps7ALAKC7jJ+onML4efh3hzvWyl7q+oYB8zMvh+drqDa6IZZe18KVhhBS+KikIb8tbIplLUyCAYJBEHGeZZmZVV+KYopHzhF+bCMkAGU0UlLc8SJt0/TqD4qX3kh4bVmnZNzGgMZHTCzSZeAbn7ymQcFHMqBypTveiCqKXymiinPf1NVcE4oznXrH44+P/RMRr/HMV26K9VCOnJua+UTIN3NFWyoszMJvZOZ5UnZPVajefPyETb8rq/xXBX5GTnRw31AOasEqVmxPsgot0RViC8NPVFEphbZKQ4dfJ9QOI+vb/hwbLo+SFMdH2E5CgOCyMZfEwWGuQLQHI6feBwK7VtAczbEWio7sh5L2+b0aXhJYy15cdQqqOkOZ9i1Wj2l7dSkXslc75BYZ9YqvItjO7Tm5/jz8flFcbT3fbQtjSPuimtqcMJkSGwiuPER9X6T2Lgc38q2mzNGeFJoXfdnkNrTymJFhiSxx8aIXmqIjvNcq0c6Duq6TtfYb7TAsNnUfOUkSJ631dwWiMVf30rSCpoG3GXudGGU1HnMrO8bK3TFpxYxlyxdHjKf2g+mOkCZN06Yy1Qbk/Uads3FmimFW+X7g4ovnS1eJLCzdN+b48+GHyTmJB4p4D+Bxh1cHhkz3yMeAuqsz5uWGPiFyGqN6nVipKessB6ZCGxmUWWKub6wxJva7L9gAejJAMilMk2KZmBTaPyTm/XZi2JUjmJTK1GQIk6l9Zkqw/FgQKIf72x9xokthuNNRVlsp1GiW2JsXOQIg8HUZfBecuCaU2PZ1KIduMFEF8VB9g0xU2Yb8PdAfN6J9/+vfAksAAAAASUVORK5CYII=',
            text: '新任务',
            to: "../newTask/newTask",
            remind: 0,
        }, {
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA/CAMAAACclMsnAAAAllBMVEUAAAD4ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti3BAi6iAAAAMXRSTlMAJfrPCjsF9tThoMCGV/JcNHnoD4Aa2kLtU2ZIIh4Us60vj01xa2GWu3QrycSbinym24PVlAAAA2FJREFUSMed1ueyojAYgOEQQmihGKRJl2bX7/5vbmE9eFTYjO77B3DyaEgYRrQUTUo90voKfRVhGNQIA7e+UXSNsblyLgHYyhesCuDmDUdFg90XbI/5AY21qu1/AtI6ruuwBDNDYy7Hq7qu4yQXKtpw21ZVgOMPUwHbqm1rIZolTaWErgDrgR4E5Z1VWjBcceAJyqdRh5SgMfknzQxRA1pcua4r0ftGHIbzqgFdQY2m/Qwr7rsJU9wa2Gm+BgnmCtrC3zAAv88Y69duM9Q62ciyOQM9RG7bjoO6M9aVOzvmjyXZA982q7duI5uqo4nJ0oOtYLEoeTDHXmDW7mTOO5WukCFPWiwlAiZOzCRX+prRTWHuzHLzHZMK7dJZDpPL7AuWFkfFG47ENYv8Y0bXwbTOB21NPmWH3RZNsWP6KQuPv0tRB+6nTDm2aMoKDp+yrLihKWPnf8rQhnf0vjgxd9DHjDC9zQkhfqPvyecM0VUkG71xOnWHf+9bpIevzKtLXS7PlzhrC/dfzN+zwwtLDX6RCKEoPd8USsazxSh9ZmkhK/f9C4LGGl4tjfvjKKGzb5iY12vp/dpljG2H+mQc7LvWfn1tLNdfZDWfXjNZHQ8ltVMhJG0KFf6mFm06Z55RTtcu2/ZbtuWwIfEOQC96xvpSAzg65J1JwTX373l0nPO+6PyrCvI69P7en9vsALP8jaWB2RtTCsrPZYgugPunjUivHPr8lRFrzR65yHcydAX16qHnLB0YeWHzkggYnT1Zdixm3g7KfLbTF9hlQhbbUYJmpTLuqICRM5QemreGmydgvgYtXWAh1w4C5vIoRAtlWhQKWBIF1RLzTGwJWGzL0iIroPuPX8tPOBawSreTJZaK782XYU8Xn52jJGBoC0W++PHZE7GQ45jO566pNRIxcgMznT2TBtxyIUOuBkb+plagK0jMUBfB2X+ZwF7FDhKysYaDGXoPVBkAdkvEbMyRAc7xwc89X0pYBPJOhRURs7HK0AGCwjiPLy5uSIipcP3dAEpe+4XJ1uQqxjY3t8k408Gt7w4fU4utn2L755XIwrjrYiWb/utPDp+8TWk8desztNjk2OiwVlfKS6FEBe6qwmVwAFGgvRScKiRwq8FliEfqe9BRJGg/OORYsxxXyNBKbv8AdiBeZgNyaQcAAAAASUVORK5CYII=',
            text: '待完成任务',
            to: "../beforeComplete/beforeComplete",
            remind: 0,
        }, {
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA/CAMAAACVf2tdAAAAnFBMVEUAAAD4ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti34ti3ZCtLfAAAAM3RSTlMAsFUQ0/METWn5uOgYP6xYC4hD7+LagTpwSCNRB49cMhN7Lfbrw7yblR7LKManoWY2YpgvEh/tAAADK0lEQVRIx+2V2daaQAyAA8jgOCzDvm+CoLib93+3glRbW6r8d+05/a48ko9kQggwiZodu43pJzCbfIVIKdqlNNfYb5CdSm9DsSTzDG4iW/ax0ZE64Twl6jAdsy3Q+5SG+1ZPYNsiDJATNkr/V7j/s7jeOIwxG20DBpITInOYU5vSaz+fcMgdrGq7Zu6YhW9rZtc2YluQ4hlWgP5AuJK1S1PRMDJxNxZ2uRpGbGxwK6lb4RGXAj5p+d6tJlp0wy1fO/jAAaSCZ/akqdJnqZTflbbPUgSpecfFBaAdA7kDMBb2SpwNhQGMIVwfFDn+MSgOYkVfqehw/EeENCriT5PisN9xmCk9FeEXhV+0KayITCif+K98VEhCvqKQnRWkp9bLcj5TWXtdRSlSWtW6UcxQisCllHXC8di4MlJBI5+U3Qmpm4aRxLmaL1c2OtfkvVLoWB0vPyLOLsrn5J1CUqzSl93gH7AOCZDkT4oo0/Zxz4STu7PAJgLN25NJhR/woH7PFxln7d7jrMYz11GQJpWrTcXvRpgGmXkdHOmITWljmUwp5ISHZPyl3Ky+e54CPTFDecg+pUQH9B6GD5YF2Rl4nhsLRJpNH99iGI/G1gdxeyGBAX5XOxRxVUwrocsug2HdemOwzL5VC9lmtRPCtKIqsTTUZyow5Ilbn6hqmImxaJH3YxmWJDdzEE8WXLIPY7leBssg0MIrnEs+GIXvD23WApFPK9JRHlajri3h4nmmBko2Rra0UaeVq4zodJ258yzIswjirTZOjoBCMansNoh42q9VErYxATVINTLW22GZTColdVzaDdeS0CsDr8yfY4TW5PEtF82M0eWY8aLl0qP1Am52k0qJziVpcLGHXwhsPJNJJTKXHEIb9eLVUFxc7f7wXDgHIB7SY/SzIbro+m/ffX5Duoml52x7DJlI3iogmTLW+tmP1N1a8TqKC4V82mPcOCBWzqFpFjZFu12Tz9uSRMtGRqSI6NxCPnMnq7kReN4yjPiXNj8hf+cn6d9U7Hjfr4lZBMbuOCjMt5pmNYtNq97uhZ33SqzMIrbWq0FBd6Xrwix04SAPyldxvwGK1XwPAhlNIgAAAABJRU5ErkJggg==',
            text: '已完成任务',
            to: "../completed/completed",
            remind: 0,
        }],
        volunteerList: [{
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAlCAYAAADbVxCwAAAEG0lEQVRYhc3YW4hVZRQH8N+cM6OjZmOWipVdzEIryQrNKKIbSWUlERSVUVYiEdVDFzQfLCgqu2pU0kWkHqQLQaWYhl0eCsMualkZdpEypYvjlGaW0cPaJ4/Hfc7ZZzuj/mGzz3y39Z9vr299/7WatswfLid64XiMxJE4GkOxP5rxLzZgFVZiNZbiI/yWx2BzjjkX4bLkqcQ3WIOtaEFfjMbJFePmYy5exp9ZDTdl3NkWXIspGJS0fYW3sQhf4gd0pMztjQNxFM7GmTg26evA/XgC7Z1B9kI8mRiEx/AMPqs3sQaGYjwmowmbcWtiJzfZWZiY/L4PM7F2F0hW4gDcgLuSv9/AVcLXd0KhyiID8LEgulgcnsmdTBR+wd04HK9gLD7HiKxkD8WH4qTfg7PwRSeTrMR3uAS3YyA+wEmVgyrJ7ot3cAhuwdSuZJiC6bgareLwDinvrCT7Og7DbeIg7QnMwQT0EJGmZ6mjnOwUnIbZeHB3skvBbDwsNm5WqbEUDQaKw7MB/bBt9/NLxdfCFUZiaekGK/nmTeoTHSPCGPydg0BB+OR08clr4UYswKM4tRltmIR1eCGDsf1UCS0NYkCGMW8KXXEKhjXjXPHfPp7RyFxxt7cIsdIoCvgHGzOOfwRPY1wzTk8aX2vAYJoG6CosTN5jCmKLN+n6wJ8Xa/AjRhcwDN+LT7O3Yi26N6OoAU2JPkKjtsgXDYrJswTrM87ZzHbxXU3QpGE8ZjQwvhpm4OaMY4sE2XaRimTFq8nkVvmiQZP4IgsamNNG3GALhbLqJ2du1MVoEbw2FvC+cINRe5RSdYzAPlhcwLyk8fo9x6cmrkje80pCZpVIpweJxG9vQS/8LM7GgFI0uBMvCmmYlmKXY6yQb03yxeYCuuFecY3WwjSha6diU4nsS1iOS/GUyBaqoQf6JwbzRoNtIkWvhWNExtuOh9gxux2eEN6CwfipzmLd5dO9hWRerblFUYsYgvOFcNrhMlghstlWceja6hj9S7hBo8/WOkQJUTUED5SIVpIlfGiOyGzPqbNgV6CbIHee0NZ3lHemXbOlSkuxa3nthFH4ROjrZ8W1vgPSyB6UvOvWnjoJbaI+sUQUU6bhurSBaVXEPsl7XZXF86qtSvTFNaIi01Po1okilUlF2s4OTt7fVrQPFP7UIUo9F9teUcyK/iLhfA6/irheFKWpI2oRZefCXFOySIfI2UuYIA5fIekvV2lrRD1suUjl24X+7C6+Uh8h8M8Q1cMS1ov8apaMLlfpBv1E9rosMXC5KOccnPRPShY/QRyEcTgxGZMFK0RYWoR3M875H5U7eyWeTxk3U5STVqf0teI44RK9Rb2sVcTTDvwucqhl+KNRguUo39kiLhDCYSU+xXt4S+1sdos4yUt2hUgW/Afdre6Ry9T9LwAAAABJRU5ErkJggg==',
            text: '金点子',
            to: "../proposal/proposal"
        }, {
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAtCAYAAAAz8ULgAAAD6UlEQVRYhcXZW4hVVRzH8c+Mo10htAuWpFGYQeoERUESFTZRpF2ohxQqQqKiIuihHquXLhBBJRYh9RDdJB9szLxEWUF0oavlQ2A5qGB2USfIqNF6+O/d2ed0PHvtvcf6wrD/e53/Out31vqvtf5rTd/va+aoyURcgSHMwSk4EnvxHT7HerxVt4Gcvpoi78XdOCnB9ys8ipfqNAT9Ff3PxBdZo50Cd+Bb7Ooon4sXMYxjamisJHJI9MpgoWwYi3AqZmAWpuMM3IYPC74LsAknVxWZOtyDogdzNuMuvJ1QdzGWafXiTpyOX1NFpvTk4R1i1ophTxFIxOJsbMnep+LNVIGkiXwSUzL7M1xepYGM7ThPzHyYh5tSK5cN93SMZPYYTsRP1TX+w0V4J7N/xgk4UFaprCfvLNgPayYQNopwgWNxbUqlMpFXZc8xPFZL1r95qGBfl1Khl8jTxCyE9zBaU1Qn72utpfMwoaxCL5EzC/YnDUR1I1/OponZ3pNeIo8v2NubKOrCtoJ9XJlzL5HFz/bXltOdsYLdaLiLMzklkajCtIL9S5lzL5HfF+yzasvpztzs+aNITHrSS+Rmrdi5WOSP48Gg2CTgY/xZVqFsnVyTPY/CLfV1tXFPwV6VUqFsW5wt0ivYLWZi6TbWg5ki54Q/MBm/lVUq68mvsTqzJ2NlXXUZbxTsByQIJC0LWoK/MvtqPFVJVtAnUrt8g9gicoEkUkTu0trDiaTjda3gL+NcfCkmX85QYl2kHx+GtU+chSK2Hsc5XfyPyIS8gI/EaZKI5wu0L2+lVD0tzhfDdLb2HzgihnCfOCbM0r6tEvG9KHtWos6RdjGex6RE/914Ag9WbShnoILvlbgP55f47cMP4qixFq9qmOaliJwqTnvXdJSP4l18gG/E9rYnK2+awbdRJnJI9MTkQtkmLMWKTNQhp5fIm/Fc4X2vuF559pAq6sLBRC7B8sL7etwoYi2VxeKHTlQvH+0Xm8hr3Wb3JdhQeH8Gt1dsYIL2xLYRnYv5FK0jJzytukBi0V5e6pXGys6e3IgLM3sdLmvYwAwx3HUypz4RJluLMblAS+AesfU1ZaTcpZyiyKUF+wYJGXMCR+Mw9SfOGEZzkQvF0BBn7NXdalWgD4+IpGRSTZH55FuRx+Q6XJp9OF/6tV5ZA+PCgDgS5AK3aS6Q6Lk7cKv6Eycf7pcHRM/lvNJYXotl2V9j+rVnNRsO5vh/0i8u4XMqJ6T/BQNaZ5Vtqu3NZczC9VkbdWNyP1YNaKX5O2t+2cEa+FRcKjTl/n5xLUzr8n682DpO37NjQGQ5i7TvOE05IP7bsFCzxXw/1v0NaATMX+ARyAYAAAAASUVORK5CYII=',
            text: '我的名片',
            to: "../myCard/myCard"
        }, {
            image: 'data:image/png;base64,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',
            text: '我的顾客',
            to: "../customer/customer"
        }, {
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAmCAYAAABZNrIjAAADvklEQVRYhcXYW2gdVRTG8V/aXNrEpoJGhdaKWC0Bg1ZEKNIKrSjeEBQreHmpUG37IBpR8VoEbyDSB7UXpFVEpSIKXvJS8FIUBJUKVqtBpUpb0ViNJca0NokPa49nckzSOTknyQfDmpm9z57/mb3W2mt23UBXRws24Sa105e4D+/UYrB6vIqr0JOOpirGG8QwOvA2zsZXVTKqT4D7Mb/awXK6A09jhcogV+JuNGMDtmSQ0FtDQNib7FAFv8n+WKbNWITODLKheq4RmpPsYMH+twjAg7gOh/Ee7sSh+nF+WAv1FOizEs+n8+14P50vwrdYP1mQM5JdhYXCx4bF9J+IXdiKixNYprXYh8fxozQTkwWZuc9l6ShXu8gAO9L1DSJ4P8RjOFlkhmZsmizId3G18K28mlNbG35I9x4QaRDOw8u4PV3vxLrJgjyAt8ZoOw670Ygn8WiubZfIDO3pfAWGZphazcP3OB4bcW9Z+3bhHt1YhqOUHHwq1IoPcBJeEUGS12YR6fuwBH1Zw1RBNuFjEelduLGs/Smsxh84B7/L5e5j+eR8MUX/VAg1V6SPncL3dohofQPXlvVdj04RZOcnwCfS0XssyAfxSIVwed2WINdhabrXmI4j6boTD6fzpSLiP8IFcv46FuTyBPgbXkv9irpGvch3L6Trm5PtxpUicJZhsZjm7HmfivLuQnxRPuBoujzZ1XizINxompdg9if7EO4R9WZL6nON0lLYluyR3Bhjvp3hZP+uApDSarMN/QmyOwe4ysiXsHc0rrEgjyY7u0rILEh+EgHyF84Sa/gaAZ/XqNVY0RXnTDH1s41dftWl8T4TxUMzLkptW3L9nsUz+KbgswtDXoK7CvbtE5BLlGaiN8FtFP5ZkYpCbhO+1KjkCuWqE+6zBzNxv5jmDQn6z0rhKoXsVyqriqgBz4nVpb9SqHIVhTxXrBZzjb/6NIgPr0vxenVoJRWFnIXTC/Y9Q8BWm77+U1HIT4TPTYsqKXpbcYLxp3tIpJ6WsvszxSqyuyK6pKKQ7fh6Ig8o01qRhipSUciDIhBO8f/vlqLPmfQ3+av4aJ8WFYVswvVYYOJRWyd8Mx+As/AzXjJOPi0KuRAvThCuiPaIAnlUFYX8TuzXnIqBGkBlasIv+Hy8TkUhD4v1d1qU1ZPluS+732dqlT1v1KJ3zsi+DiRby43VIlqQ7Ihiu17sAy4XftcjVo3TUvtW3KqyD7GJaFBE/uJ0PWKvvW6gq6NN1ItX5O4PJ+BWkSamSofE5tUape8s/wKN58J6gUdq+gAAAABJRU5ErkJggg==',
            text: '历史评价',
            to: "../hisComment/hisComment",
        }],
        clientNav: [{
            image: 'data:image/png;base64,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',
            text: '预约中',
            to: "../newTaskDetail/newTaskDetail?user_type=U&bookStatus=0"
        }, {
            image: 'data:image/png;base64,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',
            text: '预约成功',
            to: "../newTaskDetail/newTaskDetail?user_type=U&bookStatus=1"
        }, {
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABECAYAAAA85kOPAAAJzElEQVR4nO3ceYxdVR0H8M/Mm3YorWUpLaWI0FahIoiAggRiXJBFJRA2kQSxiKlR424kxIXAPy5R0YhGUDYFVEC2oIgS1AIVhAKWRaQIlLVQlpa2QzvMjH987817nZk3y5uZvpbMN7mZ9+5y7jnf89vPedOybuExM/AZHI9JeM3mjUrx91/4Ie5Az3AbacPn8M3R69cmg9nFcSKWDvfhVny8zrVhs9xk9NffvXBoI421YYua793C7r3Fi9oaabQJ6BETsAP2xeTi/ERMaaTBNnTWfH8Q38ZNaCmubw6S0yPjeCO+geOk790atJm1EtGDO3HlyPrYVDyAa3EYthlJQ601n3uKY4s6924uaDUKUt7a6/sEm49dqYeJ+o5r2Oivgc3BpgyEUen/iJl9vWKcmDoYJ6YOxompg3Fi6mCcmDoYJ6YORhLMtUnYXTG2sU8rVmHNGL6jDxolphVHSa1jS3SNWo82RItE43fhB3h+jN7TB40SMw1fxIGj2JeBcDAW4ZqN9L6GbUybSMrGxMSN+bJGJeY5/EbqHVsYO1UiqvSgqNNGQ6PEdOHn+IsQ0z1qPeqLCh7H8jF8Rx+MxCt1YMlodWRTw3gcUwfjxNTBODF18HokpssoROKbc323Ih6xXVx6D9YX50svWa43DRubGzHtmFUcc/AWzMQbiuursYvqglv5TKthhhSbCzGTZYXxQLxPll6nSy41ECo4As/gHgkUhyRBIyWmnI3Rzq5bZIZb8Q4cI0nr3F73dclAO4s+VGRMFdVdDwcVxyL8HtfhkcE60CgxLXiPLJhPNPopQQvWST72QexZc22NSMASiYifx8tFH9qlFDITu+Kt2E5s0AHFcTh+hhuKd/SLRonZBl8vXrKxsBK340+SNy0VgvpDO3bCPFG/w7G7EHSIqOJPcQ5e6q+BRomZJMZvY+F2nC+52aNDuH+dELdUiLwcR+MkvAnb4wyRrDMlKd4AjRKzAlfJroIJRp5EdhZtbIdtVY1qh2TxP8b9DbbdhcWiegvxVanvVGQnWZvskFhR+1CjxKyTitqfRXpGQkyP2IhdcZoUwYjqfBfn6dXpBtEp/f0fTsfJMgHzxU59R035dCReaQX+NoLne+MQ7Fx8Xin7dH6BV4fy8MSDrhjw+vpbji0/Piz2sROnivP4vGwhuay8aVOJY06Qzk2R6PVsnCuktEsANwlrVT3QBqgZ+FDwHM7CDByJqULWEtzHpkHMHBHn6cX3P4ikdAgpb5bgbiaW4TY8Yeix05SijRnigR4T1XkC35fYaA/xVB+VGKej2cRMwIclJoL/SIxRuuEpeLesRuwmg5ku5D01hPa3Lp4/Utz1Y8WzN0n6sEhs2FkiNQtwNe5qNjGz8CHVuvGVst2tRJtsSd0XW4mbrQihV4shrYep2Ef2Lx8qHm83vCgT8JA4jWskzjlMSD8M9ze77LAP3l58/i+uFxUq0SGS8bTYnrbimfn4iOzS7A/tEtidIkZ9lhjZqULwhJp7H5d9e2WgdwK2ayYxW0oOM0vsxUJ9Y5U1uEU6vqw4V5Gser4EbTN6PTNZyCjJ27Fof40kkXfqG9AtUt0kvQfmNZOYbWSAxNMslqXYWnRJh39XHGXy1y750ydlhudIwjkN7xVSDhfpKNt5AJfgZn3joiXF+0tvd8BIbMz0YmBDDfDKxPBhmbEdJTwnxva+8sYyJilccIdsyO6QmT9R7E5FPMmCou1rxcCeiv1UNz534W6JoP8oBrh3f7tElTuK597ZKDHt4vdPVN1oPBhapERwFb4kxG5fXHta/YRQ0f5DuEhsxUliX1rFFS+Q8sT2kkFvXTzXKQnnJeKNnh7gHY+L5E7B7EaJmSHlgHrGbyAcUjy/heRFig4NtpuhR7zQxTLDx4rETpQseifVMqeivbtxAW40MClkQa9U5a0btTGr8WyDzy6XTm+luh691oZb9+uhW2zF+aIaDxbnWmSmS1J6RP0ulIx8IGkssVY1/WhtVGJekqTrHhncUFWpU4Krl/XdgT5YmbJEj5QeLhf1mSOSUotlorLX6aekUAfdqtF0z0iM7834h2qFfigoS5EVMcSviY1qVy1FDgXb4V1iU/qT+gkiQcMZ3yQ1OypG6q67RPzWDfEoC9E9kkGvLL5PVSNBgySEO0j8skC8T6k+tTM+U/KejwmJQ8E01dWGNc2KY7rF1pRiPtPgA5ggZYmj8AnJgUqJeFnc8AtCTumtTizu3cXgqrqTqjd7spm50lN4UgrWsySPWdzPfS0y2DeJJzxJotNyUlfj71KE2kW81WzV9KG9+HyF2KZ6hfu5qrHPvc2MfJ9XDcNnSKLYW50qovuzJdk8RQZb7uZ6RQj5lXiqcyRmWaaqtvOkWne0SGZ/kjNXDHkpKLc1k5gO+aXrKuns/vquG02UWOV4kZS9VT3Qk+KKLxRy1gkhvy7OlTWbiqpaHSfS2Zuc/VWXaJ7BPc0k5jX56W+ZCuwlq4y9Oz2tOF87oyvEI54nhavaGGipuPILpLzQXTy3Fz4tvxqu/d3kllKWKAtlV2J5s8sOj4rb7xKPcLyIfolXJZBcoWobXpCc5wLJvF+0YbjQI1n6xZJClHUXYsdOlsSzzNOOkGi8zOWuwupmE7O26Ei5Ze0g8SKlremRHOZ6SfLWidpcLGWK1QO0vUyK25eper9nxVC/JCq2s2TiM4vrV0jQuknUfJdISWF3sSnzJZy/tLi+RlTuRnHxl4qk1F1eLdAjduivoi6zi3YXyoSswhdkjYlI3rnF302CmPViMA+UwtJ0WSVcIWS0isFdLEWmOwxOSokyt1oh3m2ZBJUT8Fmp51RETc8u2kb/xAw1ZxlNPIXvifeYJ57oR/iyqM4ysS3r9S1mDYTydwgrVeOeSRI1n65ayLoGv1SzhtXbxnRq3j+9WIhvqWbCu0tc8imZwOViG4azs6I2TegWdTqjOMpI+5bi+wYZeK3ElJIypJW/McLlMpDTJGaZK8u0+4q63dpgu1tJ9f8UvF913LfiK/rZr9ybmL2LBm4SaRpOxjsa6BLPMFVUa5rUhk8VG3S9eJU7RLUGw64SvB2KD6h6H1LRO1MMch+02ZCcPYoO3a0aNW5srJL/0VBbdKoUfdtVotd7xag+Li54lZiAdqkK7ijStifephq8EUJ/ImlE3UW7lnULj1kmmWUtyn9n0AxDXNqElkHe3ym50ivifrtkkqeIxE224cR2iau/SFRoQJPRht/ia73OD9apsUTv93aJyD8i0nKwDHqCSMe2BsYTEkReKy6/3x1UvdEm/66oIul6u6HVXscaZezysMQX18kM3yDSvV9x7CaZ+SQZS+nOn8K/8U9Ru7LOPGT8H6eIXFaoT4EOAAAAAElFTkSuQmCC',
            text: '预约失败',
            to: "../newTaskDetail/newTaskDetail?user_type=U&bookStatus=2"
        }, {
            image: 'data:image/png;base64,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',
            text: '我的评价',
            to: "../hisComment/hisComment"
        }],
        clientList: [{
            image: 'data:image/png;base64,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',
            text: '免费名额'
        }, {
            image: 'data:image/png;base64,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',
            text: '服务历史',
            to: "../serveHis/serveHis"
        }, {
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAlCAYAAADbVxCwAAAEG0lEQVRYhc3YW4hVZRQH8N+cM6OjZmOWipVdzEIryQrNKKIbSWUlERSVUVYiEdVDFzQfLCgqu2pU0kWkHqQLQaWYhl0eCsMualkZdpEypYvjlGaW0cPaJ4/Hfc7ZZzuj/mGzz3y39Z9vr299/7WatswfLid64XiMxJE4GkOxP5rxLzZgFVZiNZbiI/yWx2BzjjkX4bLkqcQ3WIOtaEFfjMbJFePmYy5exp9ZDTdl3NkWXIspGJS0fYW3sQhf4gd0pMztjQNxFM7GmTg26evA/XgC7Z1B9kI8mRiEx/AMPqs3sQaGYjwmowmbcWtiJzfZWZiY/L4PM7F2F0hW4gDcgLuSv9/AVcLXd0KhyiID8LEgulgcnsmdTBR+wd04HK9gLD7HiKxkD8WH4qTfg7PwRSeTrMR3uAS3YyA+wEmVgyrJ7ot3cAhuwdSuZJiC6bgareLwDinvrCT7Og7DbeIg7QnMwQT0EJGmZ6mjnOwUnIbZeHB3skvBbDwsNm5WqbEUDQaKw7MB/bBt9/NLxdfCFUZiaekGK/nmTeoTHSPCGPydg0BB+OR08clr4UYswKM4tRltmIR1eCGDsf1UCS0NYkCGMW8KXXEKhjXjXPHfPp7RyFxxt7cIsdIoCvgHGzOOfwRPY1wzTk8aX2vAYJoG6CosTN5jCmKLN+n6wJ8Xa/AjRhcwDN+LT7O3Yi26N6OoAU2JPkKjtsgXDYrJswTrM87ZzHbxXU3QpGE8ZjQwvhpm4OaMY4sE2XaRimTFq8nkVvmiQZP4IgsamNNG3GALhbLqJ2du1MVoEbw2FvC+cINRe5RSdYzAPlhcwLyk8fo9x6cmrkje80pCZpVIpweJxG9vQS/8LM7GgFI0uBMvCmmYlmKXY6yQb03yxeYCuuFecY3WwjSha6diU4nsS1iOS/GUyBaqoQf6JwbzRoNtIkWvhWNExtuOh9gxux2eEN6CwfipzmLd5dO9hWRerblFUYsYgvOFcNrhMlghstlWceja6hj9S7hBo8/WOkQJUTUED5SIVpIlfGiOyGzPqbNgV6CbIHee0NZ3lHemXbOlSkuxa3nthFH4ROjrZ8W1vgPSyB6UvOvWnjoJbaI+sUQUU6bhurSBaVXEPsl7XZXF86qtSvTFNaIi01Po1okilUlF2s4OTt7fVrQPFP7UIUo9F9teUcyK/iLhfA6/irheFKWpI2oRZefCXFOySIfI2UuYIA5fIekvV2lrRD1suUjl24X+7C6+Uh8h8M8Q1cMS1ov8apaMLlfpBv1E9rosMXC5KOccnPRPShY/QRyEcTgxGZMFK0RYWoR3M875H5U7eyWeTxk3U5STVqf0teI44RK9Rb2sVcTTDvwucqhl+KNRguUo39kiLhDCYSU+xXt4S+1sdos4yUt2hUgW/Afdre6Ry9T9LwAAAABJRU5ErkJggg==',
            text: '金点子',
            to: "../proposal/proposal"
        }, {
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAtCAYAAAAz8ULgAAAD6UlEQVRYhcXZW4hVVRzH8c+Mo10htAuWpFGYQeoERUESFTZRpF2ohxQqQqKiIuihHquXLhBBJRYh9RDdJB9szLxEWUF0oavlQ2A5qGB2USfIqNF6+O/d2ed0PHvtvcf6wrD/e53/Out31vqvtf5rTd/va+aoyURcgSHMwSk4EnvxHT7HerxVt4Gcvpoi78XdOCnB9ys8ipfqNAT9Ff3PxBdZo50Cd+Bb7Ooon4sXMYxjamisJHJI9MpgoWwYi3AqZmAWpuMM3IYPC74LsAknVxWZOtyDogdzNuMuvJ1QdzGWafXiTpyOX1NFpvTk4R1i1ophTxFIxOJsbMnep+LNVIGkiXwSUzL7M1xepYGM7ThPzHyYh5tSK5cN93SMZPYYTsRP1TX+w0V4J7N/xgk4UFaprCfvLNgPayYQNopwgWNxbUqlMpFXZc8xPFZL1r95qGBfl1Khl8jTxCyE9zBaU1Qn72utpfMwoaxCL5EzC/YnDUR1I1/OponZ3pNeIo8v2NubKOrCtoJ9XJlzL5HFz/bXltOdsYLdaLiLMzklkajCtIL9S5lzL5HfF+yzasvpztzs+aNITHrSS+Rmrdi5WOSP48Gg2CTgY/xZVqFsnVyTPY/CLfV1tXFPwV6VUqFsW5wt0ivYLWZi6TbWg5ki54Q/MBm/lVUq68mvsTqzJ2NlXXUZbxTsByQIJC0LWoK/MvtqPFVJVtAnUrt8g9gicoEkUkTu0trDiaTjda3gL+NcfCkmX85QYl2kHx+GtU+chSK2Hsc5XfyPyIS8gI/EaZKI5wu0L2+lVD0tzhfDdLb2HzgihnCfOCbM0r6tEvG9KHtWos6RdjGex6RE/914Ag9WbShnoILvlbgP55f47cMP4qixFq9qmOaliJwqTnvXdJSP4l18gG/E9rYnK2+awbdRJnJI9MTkQtkmLMWKTNQhp5fIm/Fc4X2vuF559pAq6sLBRC7B8sL7etwoYi2VxeKHTlQvH+0Xm8hr3Wb3JdhQeH8Gt1dsYIL2xLYRnYv5FK0jJzytukBi0V5e6pXGys6e3IgLM3sdLmvYwAwx3HUypz4RJluLMblAS+AesfU1ZaTcpZyiyKUF+wYJGXMCR+Mw9SfOGEZzkQvF0BBn7NXdalWgD4+IpGRSTZH55FuRx+Q6XJp9OF/6tV5ZA+PCgDgS5AK3aS6Q6Lk7cKv6Eycf7pcHRM/lvNJYXotl2V9j+rVnNRsO5vh/0i8u4XMqJ6T/BQNaZ5Vtqu3NZczC9VkbdWNyP1YNaKX5O2t+2cEa+FRcKjTl/n5xLUzr8n682DpO37NjQGQ5i7TvOE05IP7bsFCzxXw/1v0NaATMX+ARyAYAAAAASUVORK5CYII=',
            text: '我的义工',
            to: "../myVolunteer/myVolunteer"
        }, {
            image: 'data:image/png;base64,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',
            text: '我的邀请码',
            to: "../mycode/mycode"
        }],
        icon8: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABbElEQVRYR+2VzU3EMBBGv4mUXNkOgA7ogGwJVEAixVGOoQM6gGNkHzZbAXSw6QA6ADqAa3IYNCiRVlzWf2KFtD7l4Ph7fh6PCUcedOR8nAD+j4GmaS66rnuPXTPWBpRSA4CzaZrWfd9/xgJxAbgiooGZ32JCWAPIjouiWGVZ9mOCmW+MMa+hJpwA9iGY+RzAOhTCGWCBSNO0B3BNRKXW+tnXhBfAElbXtUDcMnNpjJFv5xEEIGmhEMEAAqGUKohow8y9MaZ00RAFIAQiGoBAVFWVJ0myA3CntX60MREVYO4TLwC2Wuv7PwVQSkmnfALwNY5jbtuuoxiQcAA7IvpwCRdDwQDLDRDt4zi2tjtfjicIoK7rFsDDfOaFzZn/nuMNENqAvA3Mlb6Rh4iZW98W7AUg4WmaSrFdMnMe+hI6FeH+NWPmIka4K8BARCvXa3aoMK2LUPS7XrFD4U4GbBbzmWNtwGdxm39OAEc38A1M6qQhLf9YgAAAAABJRU5ErkJggg=='
    },
    navTo: function(event) {
        let url = event.currentTarget.dataset.to;
        wx.navigateTo({
            url: url,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function(options) {
        var _this = this;
        _this.setData({
            status: app.globalData.user_type,
        });
        wx.getStorage({
            key: 'userInfo',
            success: function(res) {
                _this.setData({
                    headImg: res.data.avatarUrl,
                    name: res.data.nickName,
                });
                setTimeout(function() {
                    _this.setData({
                        headImg: res.data.avatarUrl,
                    });
                }, 2000);
            },
            fail: function(res) {
                _this.setData({
                    headImg: app.globalData.userInfo.avatarUrl,
                    name: app.globalData.userInfo.nickName,
                });
            }
        })
        if (app.globalData.user_type == 'U') {
            // 获取用户免费名额
            var data = {
                id: app.globalData.id
            };
            var url = config.route + api.InfoU;
            network.GET(url, {
                params: data,
                success: function(res) {
                    _this.setData({
                        ServiceCount: res.data.info.service_count,
                        remind: res.data.remind,
                    });
                    app.globalData.code = res.data.info.code.code;
                },
                fail: function() {
                    //失败后的逻辑  
                },
            })
        } else if (app.globalData.user_type == 'V') {
            // 获取用户免费名额
            var data = {
                id: app.globalData.id,
                type: 'remind',
            };
            var url = config.route + api.GetVolunteer;
            network.GET(url, {
                params: data,
                success: function(res) {
                    var dataNav = _this.data.volunteerNav;
                    dataNav[0].remind = res.data.newTask;
                    dataNav[1].remind = res.data.confirmTask;
                    dataNav[2].remind = res.data.completeTask;
                    _this.setData({
                        volunteerNav: dataNav
                    });
                },
                fail: function() {
                    //失败后的逻辑  
                },
            })
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onLoad: function() {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
})