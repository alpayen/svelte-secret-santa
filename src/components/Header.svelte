<nav>
    <div class="logo">
        <a href="#">Secret Santa</a>
    </div>
    <div class="links">
        <a href="https://grauw.fr">We made this app</a>
    </div>
</nav>

<style lang="scss" type="text/scss">
    nav{
        display: flex;
        height: 50px;

        padding: 0 20px;
        background: #dff6f0;

            a{
                text-decoration: none;
                cursor: pointer;
            }

            .logo {
                  display: flex;
                  padding: 0 20px;
                  align-items: center;
                  justify-content: center;

                    a{
                      font-size: 30px;
                      font-weight: bold;

                      &,
                      &:hover,
                      &:focus{
                          color: #2e279d;
                      }
                    }
                }

            .links{
                display: flex;
                align-items: center;
                justify-content: flex-end;
                flex-grow: 1;

                    a{
                        &,
                        &:hover,
                        &:focus{
                            color : #4d80e4
                        }
                    }
                }

    }
</style>
