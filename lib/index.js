
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

        this.init()
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
        this.log( chalk.cyan( root.name ) )
        this.log( '' )
    }

    onRule( rule ) {
        this.log( chalk.grey( 'names' ), rule.name )
        this.log( chalk.grey( 'value' ), rule.value )
    }

    onRuleset( rule ) {
        // Dont output mixin definition ruleset info
        if ( /Mixin/i.test( rule.raw.type ) ) {
            return
        }

        try {
            var rulesets = rule.raw.rulesets()
            var variables = core.Object.entries( rule.raw.variables() )
            var rules = rule.raw.rules.filter( r => {
                return !r.variable
            })
            this.log( chalk.grey( 'Ruleset' ) )
            this.log( 'number of immediate sub-rules:', rulesets.length )
            this.log( 'number of variables:', variables.length )
            this.log( 'number of rules:', rules.length )
        } catch( err ) {
            this.error( 'error calculating number of rules and variables' )
        }
    }

    onSelector( selector ) {
        this.log( '' )
        this.log( chalk.yellow( selector.name ) )
    }

    onVariable( variable ) {
        this.log( chalk.magenta( 'v' ), chalk.grey( 'name' ), variable.name )
        this.log( chalk.magenta( 'v' ), chalk.grey( 'values' ), variable.value )
    }

    onComment( comment ) {
        this.log( chalk.grey( 'comment' ), comment.value )
    }

    onMixin_definition( mixin ) {
        this.log( chalk.green( 'md' ), chalk.grey( 'name' ), mixin.name )
        this.log( chalk.green( 'md' ), chalk.grey( 'params' ), mixin.params )
    }

    onMixin_call( mixin ) {
        this.log( chalk.green( 'mc' ), chalk.grey( 'name' ), mixin.name )
        this.log( chalk.green( 'mc' ), chalk.grey( 'param' ), mixin.args.map( arg => {
            return arg.toCSS()
        }).join( ', ' ) )
    }

    onMedia( media ) {
        this.log( '' )
        this.log( chalk.grey( 'media query' ), chalk.yellow( media.features ) )
    }
}
