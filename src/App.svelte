<script>
    import Header from  './components/Header.svelte'
    import Members from  './components/Members.svelte'
</script>

<div id="app">
    <Header/>
    <Members/>
</div>


<style lang="scss" type="text/scss">
    #app{
        height: 100vh;
        display: flex;
        flex-direction: column;
    }
</style>
