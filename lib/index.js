
import chalk from 'chalk';
import core from 'core-js/library';

import Base from 'ho-conformance-base';

/**
 * Debug
 * Logs parse debug info to stdout
 * @class
 */
export default class Debug extends Base {
    /**
     * @constructs
     */
    constructor() {
        super()

        this.taskName = 'Debug'
        this.runner = null

        this._bindHandlers()
    }

    /**
     * install
     * @param opts <Object>
     */
    install( opts ) {
        super.install( opts )
    }

    /**
     * destroy
     */
    destroy() {
        super.destroy()
    }


    /*-----------------------------------------------------------*\
     *
     *  Listeners
     *
    \*-----------------------------------------------------------*/

    onRoot( root ) {
        console.log( '[Debug]', chalk.cyan( root.name ) )
    }

    onRule( rule ) {
        console.log( '[Debug]', chalk.grey( 'names' ), rule.name )
        console.log( '[Debug]', chalk.grey( 'value' ), rule.value )
    }

    onRuleset( rule ) {
        // Dont output mixin definition ruleset info
        if ( /Mixin/i.test( rule.raw.type ) ) {
            return
        }

        console.log( '' )

        try {
            var rulesets = rule.raw.rulesets()
            var variables = core.Object.entries( rule.raw.variables() )
            var rules = rule.raw.rules.filter( r => {
                return !r.variable
            })
            console.log( '[Debug]', chalk.grey( 'New Ruleset' ) )
            console.log( '[Debug]', 'number of immediate sub-rules:', rulesets.length )
            console.log( '[Debug]', 'number of variables:', variables.length )
            console.log( '[Debug]', 'number of rules:', rules.length )
        } catch( err ) {
            console.error( 'error calculating number of rules and variables' )
        }
    }

    onSelector( selector ) {
        console.log( '[Debug]', chalk.yellow( selector.name ) )
    }

    onVariable( variable ) {
        console.log( '[Debug]', chalk.magenta( 'v' ), chalk.grey( 'name' ), variable.name )
        console.log( '[Debug]', chalk.magenta( 'v' ), chalk.grey( 'values' ), variable.value )
    }

    onComment( comment ) {
        console.log( '[Debug]', chalk.grey( 'comment' ), comment.value )
    }

    onMixin_definition( mixin ) {
        console.log( '[Debug]', chalk.green( 'md' ), chalk.grey( 'name' ), mixin.name )
        console.log( '[Debug]', chalk.green( 'md' ), chalk.grey( 'params' ), mixin.params )
    }

    onMixin_call( mixin ) {
        console.log( '[Debug]', chalk.green( 'mc' ), chalk.grey( 'name' ), mixin.name )
        console.log( '[Debug]', chalk.green( 'mc' ), chalk.grey( 'param' ), mixin.args.map( arg => {
            return arg.toCSS()
        }).join( ', ' ) )
    }

    onMedia( media ) {
        console.log( '' )
        console.log( '[Debug]', chalk.grey( 'media query' ), chalk.yellow( media.features ) )
    }
}
