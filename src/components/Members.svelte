<script>

    import {members, shuffledMembers} from './../store'

    import {quintOut} from 'svelte/easing';
    import {crossfade} from 'svelte/transition';

    const [send, receive] = crossfade({
        fallback(node, params) {
            const style = getComputedStyle(node);
            const transform = style.transform === 'none' ? '' : style.transform;

            return {
                duration: 200,
                easing: quintOut,
                css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
            };
        }
    });

    function handleAddMemberSubmit(event) {
        members.addMember({
            name: event.target.name.value,
            email: event.target.email.value,
        });
        if ($shuffledMembers.length > 0) {
            shuffledMembers.shuffleMembers($members);
        }
        event.target.name.value = "";
        event.target.email.value = "";

        event.target.name.focus()
    }

    function handleRemoveMember(id) {
        members.removeMember(id)
        if ($shuffledMembers.length > 0) {
            shuffledMembers.shuffleMembers($members);
        }
    }

    function resetHandler() {
        members.reset();
        shuffledMembers.reset()
    }

</script>

<div class="members-board">

    <form class="add-member" on:submit|preventDefault="{handleAddMemberSubmit}">

        <label>
            <input required type="text" name="name" placeholder="Name*">
        </label>

        <label>
            <input type="email" name="email" placeholder="Email">
        </label>

        <input type="submit">
    </form>


    <div class="members-list">
        <h2>Members of this Secret Santa</h2>
        {#each $members as member (member.id)}
        <label
                in:receive="{{key: member.id}}"
                out:send="{{key: member.id}}"
        >
            {member.name}
            <small>
                {member.email}
            </small>
            <span on:click|preventDefault="{() => handleRemoveMember(member.id)}">x</span>
        </label>
        {/each}
    </div>
    <div class="action">
        {#if $members.length >= 2}
             <button class="shuffle" on:click|preventDefault="{() => shuffledMembers.shuffleMembers([...$members])}">Shuffle</button>
        {/if}

        {#if $members.length >= 1}
            <button class="reset" on:click|preventDefault="{() => resetHandler()}">Reset</button>
        {/if}

    </div>

    <hr>
    <div class="members-shuffled" >
        <h2>Who gives to who ?</h2>

        {#each $shuffledMembers as pair, i}
        <label
                in:receive="{{key: i}}"
                out:send="{{key: i}}"
        >
            {pair[0].name} is giving to {pair[1].name}
        </label>
        {/each}
    </div>

</div>


<style type="text/scss" lang="scss">
    h2 {
        font-size: 2em;
        font-weight: 200;
        user-select: none;
    }

    .members-board {
        padding: 0 15px;
        overflow: scroll;

        .add-member {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 2em 0 1em 0;
            width: 100%;
            border-radius: 2px;
            background-color: #eee;
            padding: 10px 0;

            label {
                top: 0;
                left: 0;
                display: block;
                font-size: 1em;
                line-height: 1;
                padding: 0.5em;
                user-select: none;
                flex-grow: 1;
            }

            input {
                margin: 0;
                font-size: 1em;

                &[type="email"],
                &[type="text"] {
                    flex-grow: 1;
                    width: 95%;
                    padding: 5px 0 5px 10px;
                }

                &[type="submit"] {
                    opacity: 0;
                    top: 0;
                    left: 0;
                    position: absolute;
                }
            }
        }

        .members-list, .members-shuffled {
            box-sizing: border-box;

            label {
                top: 0;
                left: 0;
                display: flex;
                flex-direction: column;
                font-size: 1em;
                line-height: 1;
                padding: 0.5em;
                margin: 0 auto 0.5em auto;
                border-radius: 2px;
                background-color: #eee;

                position: relative;

                span {
                    position: absolute;
                    top: 50%;
                    right: 10px;
                    transform: translateY(-50%);

                    height: 1em;
                    box-sizing: border-box;
                    padding: 0 0.5em;
                    line-height: 1;
                    background-color: transparent;
                    border: none;
                    color: rgb(170, 30, 30);
                    opacity: 0;
                    transition: opacity 0.2s;
                }

                &:hover span {
                    opacity: 1;
                }

            }
        }
    }



   .shuffle {
     background-color: #2e279d;
     border: none;
     color: white;
     padding: 15px 32px;
     text-align: center;
     text-decoration: none;
     display: inline-block;
     font-size: 16px;
     margin: 0.83em 0;
   }

   .reset {
     background-color: rgb(170, 30, 30);
     border: none;
     color: white;
     padding: 15px 32px;
     text-align: center;
     text-decoration: none;
     display: inline-block;
     font-size: 16px;
     margin: 0.83em 0;
   }
</style>
