import {writable} from "svelte/store";



function Members() {
    const {subscribe, set, update} = writable(initMembers());
    return {
        subscribe,
        addMember: (member) => update(members => {
            member.id = '_' + Math.random().toString(36).substr(2, 9);
            members.push(member)
            return members
        }),
        removeMember: (id) => update(members => {
            members.splice(members.findIndex((member) => member.id === id), 1);
            return members
        }),
        reset: () => set([])
    }
}

const members = Members();

members.subscribe((members) => {
   localStorage.setItem('ss_members', JSON.stringify(members))
});

function initMembers() {
    return JSON.parse(localStorage.getItem('ss_members')) || [];
}

export {members}


function ShuffledMembers() {
    const {subscribe, set, update} = writable([]);
    return {
        subscribe,
        shuffleMembers : (members) => {
            update(shuffleMembers => {
                return []
            })

            setTimeout(() => {
                let i, pairs = [];
                if(members.length > 1){
                    shuffle(members)

                    pairs.push([members[members.length -1] , members[0]]);
                    for(let i = 1; i < members.length; i++){
                        pairs.push([members[i -1] , members[i]])
                    }
                    update(shuffleMembers => {
                        return pairs
                    })
                }
            }, 200)


        },
        reset: () => set([])
    }
}

const shuffledMembers = ShuffledMembers();

export {shuffledMembers}


function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}



