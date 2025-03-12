export default function Homepage() {
    return (
        <div className="col-12">
            <div className="row align-items-center baseStyle">
                <div className="col-12">
                    <div>
                        <form>
                            <label>
                                <input type="text" name="username" placeholder="username"/>
                            </label>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}