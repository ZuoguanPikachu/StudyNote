function start(){
    path = "./"
    depth = 0
    renderTerms()
}

function renderTerms(){
    $.getJSON(`${path}terms.json`, function(res){
        $("#title>div").html("ZuoGuan の Note")
        $(".mdui-list").empty()
        res.forEach(function(digit){
            let term = digitToTerm(digit)
            let li = `<li class="mdui-list-item mdui-ripple" path="${digit}"><i class="mdui-list-item-avatar mdui-icon material-icons mdui-color-pink">folder</i><div class="mdui-list-item-content">${term}</div></li>`
            $(".mdui-list").append(li)
        })
    })
}

function renderSubjects(term){
    $.getJSON(`${path}subjects.json`, function(res){
        $("#title>div").html(term)
        $(".mdui-list").empty()
        res.forEach(function(subject){
            let li = `<li class="mdui-list-item mdui-ripple" path="${subject}"><i class="mdui-list-item-avatar mdui-icon material-icons mdui-color-pink">folder</i><div class="mdui-list-item-content">${subject}</div></li>`
            $(".mdui-list").append(li)
        })
    })
}

function renderUnits(subject){
    $.getJSON(`${path}units.json`, function(res){
        $("#title>div").html(subject)
        $(".mdui-list").empty()
        res.forEach(function(unit){
            let li = `<li class="mdui-list-item mdui-ripple" path="${unit}"><i class="mdui-list-item-avatar mdui-icon material-icons mdui-color-pink">assignment</i><div class="mdui-list-item-content">${unit}</div></li>`
            $(".mdui-list").append(li)
        })
    })
}

function digitToTerm(digit){
    const grade_table = {"1": "大一", "2": "大二", "3": "大三", "4": "大四"}
    const section_table = {"1": "（上）", "2": "（下）"}

    let gs = digit.split(".")
    let grade = gs[0]
    let section = gs[1]

    let term = `${grade_table[grade]}${section_table[section]}`

    return term
}

$("ul").on("click", "li", function(){
    $(".mdui-fab")[0].classList.remove('mdui-fab-hide')

    let key = $(this).attr("path")
    path += `${key}/`
    depth += 1

    if (depth == 1){
        renderSubjects(digitToTerm(key))
    }else if (depth == 2){
        renderUnits(key)
    }else if (depth == 3){
        window.location = `${path}/content.html`
    }
})

$(".mdui-fab").click(function(){
    let parts = path.split("/")

    path = ""
    depth -= 1
    for(let i=0; i<=depth; i++){
        path += `${parts[i]}/`
    }

    if (depth == 0){
        $(".mdui-fab")[0].classList.add('mdui-fab-hide')
        renderTerms()
    }else if (depth == 1){
        renderSubjects(digitToTerm(parts[1]))
    }
})

start()