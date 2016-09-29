path = require 'path'
{CompositeDisposable} = require 'atom'

module.exports =
    subscriptions: null

    outputText: () ->
        if editor = atom.workspace.getActiveTextEditor()
            ext = path.extname(editor.getPath()).toLowerCase()

            wordsAverage = 14
            wordsDeviance = 8
            string = "Lorem gibson "
            wordCount = wordsAverage + Math.round(Math.random() * wordsDeviance * 2 - wordsDeviance)
            i = 0 # gods, coffeescript is a pain in the neck!
            while i < wordCount
                gibsonIndex = Math.round(Math.random() * (gibson.length - 1));
                string += gibson[gibsonIndex]
                if i != wordCount - 1
                    # handle hyphenated endings
                    if string[string.length-1] != '-'
                        string += ' '
                else
                    # replace hyphens at end of sentence with full stop
                    if string[string.length-1] == '-'
                        string[string.length-1] = '.'
                    else
                        string += '. '
                i++

            editor.insertText(string) # >
        else
            alert('Lorem Gibson only works in a text editor.')

    activate: ->
        atom.commands.add 'atom-workspace',
            'lorem-gibson:sentence': => @sentence()

    deactivate: ->
        @subscriptions.dispose()

    sentence: ->
        @outputText()

gibson = ["nodality","nodal point","jeans","Kowloon","Shibuya","digital","hacker","post-","futurity","papier-mache","rifle","otaku","pistol","modem","uplink","ablative","semiotics","free-market","narrative","pre-","meta-","marketing","8-bit","fetishism","cyber-","cardboard","bicycle","range-rover","city","network","realism","euro-pop","j-pop","Chiba","Tokyo","San Francisco","franchise","sprawl","urban","decay","monofilament","katana","tanto","math-","bomb","grenade","tiger-team","3D-printed","plastic","carbon","nano-","tube","geodesic","dome","construct","A.I.","media","drone","sentient","dolphin","neural","artisanal","beef noodles","wonton soup","hotdog","DIY","Legba","voodoo god","systema","systemic","military-grade","denim","saturation point","order-flow","soul-delay","long-chain hydrocarbons","assault","sensory","stimulate","sub-orbital","BASE jump","youtube","footage","paranoid","apophenia","spook","industrial grade","silent","engine","RAF","wristwatch","shoes","faded","concrete","singularity","kanji","refrigerator","computer","render-farm","bridge","disposable","assassin","camera","garage","warehouse","knife","fluidity","towards","into","motion","claymore mine","face forwards","rebar","advert","dead","tank-traps","neon","convenience store","man","woman","boy","girl","alcohol","augmented reality","savant","weathered","corrupted","film","rain","vehicle","cartel","drugs","smart-","corporation","car","sign","receding","lights","physical","numinous","table","sunglasses","courier","office","pen","boat","tower","skyscraper","shrine","vinyl","chrome","market","shanty town","tattoo","human","gang","crypto-","dissident"];
