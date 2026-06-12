async function fetchWithRetry(url, options, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(url, options);
            if (res.status === 429 || res.status >= 500) throw new Error(res.status);
            return res;
        } catch (e) {
            if (i === retries - 1) throw e;
            await new Promise(r => setTimeout(r, delay * Math.pow(2, i)));
        }
    }
}

const titleName = document.querySelector(".titleName")
const firstName = (JSON.parse(sessionStorage.getItem("currentUser"))).firstName
titleName.textContent = `ברוכה הבאה ${firstName} מייד נצלול פנימה`

const extrctDataFromInput = () => {
    const email = document.querySelector("#email").value
    const firstName = document.querySelector("#firstName").value
    const lastName = document.querySelector("#lastName").value
    const password = document.querySelector("#password").value
    const phone = document.querySelector("#phone").value
    return { firstName, lastName, email,phone,password }
}

async function upDate() {
    const currenrtUser = extrctDataFromInput()
    const id = Number(JSON.parse(sessionStorage.getItem("currentUser")).id)
    try {
        const response = await fetchWithRetry(
            `https://localhost:44362/api/Users/${id}`,
            {
                method: `PUT`,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currenrtUser)
            }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! status ${response.status}`);
        }
        else {
            sessionStorage.setItem("currentUser", JSON.stringify({ id, currenrtUser }))
            alert("המשתמש עודכן בהצלחה")
        }
    }
    catch (e) {alert(e) }
}

async function checkPassword() {
    const bar = document.querySelector(".bar")
    let password = document.querySelector("#password").value
    const userPassword = { password }
    try {
        const response = await fetchWithRetry(
            "https://localhost:44362/api/UsersPassword", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userPassword)
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! status ${response.status}`);
        }        
        else {
            const a = await response.json() 
            bar.innerHTML = ""
            bar.style.display = "flex"
            for (let i = 0; i < a; i++) {
                const step = document.createElement("div")
                step.className = "stage"
                bar.appendChild(step)
            }
        }
    }
    catch (e) {
        bar.innerHTML = ""
        alert(e)
        return 0
    }
}
